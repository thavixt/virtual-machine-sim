import { create } from 'zustand'
import { CALCULATIONS } from '../logic/calculations';
import { getRandomInt, getRandomTape, sleep } from '../logic/utils';
import { IStore } from './IStore';
import { Calculation, CalculationFn, Direction, ErrorMessage, ITape, ProcessType } from '../types';

const DEFAULT_CALCULATION: Calculation = (() => {
  return 'turing';
  // random initial calculation set on load
  // const value = getRandomKey(CALCULATIONS, 'add');
  // console.debug('DEFAULT_CALCULATION:', value);
  // return value;
})();
const DEFAULT_TAPE: ITape = (() => {
  const value = getRandomTape(100, 0, 1);
  // console.debug('DEFAULT_TAPE:', value);
  return value;
})();

const DEFAULT_LOGS: string[] = [];
// const DEFAULT_POSITION = Math.floor(DEFAULT_TAPE.length / 3);
const DEFAULT_POSITION = -1;
const DEFAULT_STEP_MS = 250;
const DEFAULT_VALUE = 1;

export const useVirtualStore = create<IStore>()((set, get) => ({
  init: async () => {
    const phase = get().initPhase;
    if (['pending', 'ready'].includes(phase)) {
      return;
    }
    set(() => ({initPhase: 'pending'}))
    const ms = getRandomInt(250, 500);
    // @TODO: do something interesting
    // like read past/stored data
    await sleep(ms);
    // console.debug(`Init in ${ms}ms`);
    set(() => ({initPhase: 'ready'}))
  },
  // @TODO: do something interesting
  // for now, skip the initialization stuff
  // probably read stored calculations, localstorage/indexedDB
  initPhase: 'ready',

  step: 0,
  stepMs: DEFAULT_STEP_MS,
  isRunning: false,
  setStepMs: (stepMs: number) => set(() => ({ stepMs })),
  setIsRunning: (running) => set(() => ({ isRunning: running })),

  addCalculation: (calc: CalculationFn) => set((state) => {
    const calculation = `fn${Math.round(Math.random() * 1e10)}`;
    console.log('Adding calculation', calc);
    return {
      calculations: {
        ...state.calculations,
        [calculation]: calc,
      },
      calculation,
    };
  }),
  calculations: CALCULATIONS,

  calculation: DEFAULT_CALCULATION,
  currentProcess: 'halt',
  initialInputValue: DEFAULT_VALUE,
  currentValue: DEFAULT_VALUE,
  setInitialInputValue: (initialInputValue: number) => set(() => ({ initialInputValue })),
  calculate: async () => {
    let error: Error | null = null;
    set((state) => {
      const currentStep = state.step;
      const currentValue = state.currentValue;
      const nextValue = state.tape[state.position];
      const fn = state.calculation;
      const logPrefix = '';
      const logFn = `${fn}(${currentStep}, ${currentValue}, ${nextValue})`;
      let result = currentValue;

      try {
        if (state.currentProcess !== 'calc') {
          return {};
        }
        if (state.position >= state.tape.length) {
          throw new Error(JSON.stringify(({
            reason: 'Tape finished',
            result,
          }) as ErrorMessage));
        }
        result = executeCalculation(
          CALCULATIONS[state.calculation].fn,
          currentStep,
          currentValue,
          nextValue,
          state.direction,
        );
      } catch (e) {
        const calcError = e as Error;
        error = calcError;
        const errorMessage = JSON.parse(calcError.message) as ErrorMessage;
        const log = `${logPrefix} ${logFn} -> ${errorMessage.result} (Halted, reason: ${errorMessage.reason})`;
        return {
          step: state.step + 1,
          currentProcess: 'halt',
          currentValue: errorMessage.result,
          isRunning: false,
          logs: [...state.logs, log],
        }
      }

      const log = `${logPrefix} ${logFn} -> ${result}`
      return {
        step: state.step + 1,
        currentValue: result,
        logs: [...state.logs, log],
      };
    })
    return error;
  },
  reset: () => set((state) => ({
    currentProcess: 'halt',
    currentValue: state.initialInputValue,
    logs: [],
    position: DEFAULT_POSITION,
    step: 0,
  })),
  setCalculation: (calculation) => set(() => ({ calculation })),
  setCurrentProcess: (c: ProcessType) => set(() => ({ currentProcess: c })),

  // tape
  halted: false,
  position: DEFAULT_POSITION,
  tape: DEFAULT_TAPE,
  tapeString: DEFAULT_TAPE.join(' '),
  setTape: (tape) => set(() => ({
    tape,
    tapeString: getTapeString(tape),
  })),
  setTapeString: (tapeString: string) => set(() => ({
    tape: getTapeFromString(tapeString),
    tapeString
  })),

  direction: 'forward',
  // api
  advance: () => set((state) => {
    if (state.direction === 'forward' && state.position >= state.tape.length - 1) {
      console.warn('Tape looped from the end');
      return { position: 0 };
    }
    if (state.direction === 'back' && state.position === 0) {
      console.warn('Tape looped from the start');
      return { position: state.tape.length - 1 };
    }
    return { position: state.position + (state.direction === 'forward' ? 1 : -1) };
  }),
  reverse: () => set((state) => ({ direction: state.direction === 'back' ? 'forward' : 'back' })),
  write: (n: number) => set((state) => {
    const position = state.position;
    const updatedTape = [...state.tape];
    updatedTape[position] = n;
    return { tape: updatedTape, tapeString: getTapeString(updatedTape) };
  }),

  // logging
  logs: DEFAULT_LOGS,
  addLog: (log: string) => set((state) => ({ logs: [...state.logs, log] })),
}));

function getTapeString(tape: ITape): string {
  return tape.join(' ');
}

function getTapeFromString(input: string): ITape {
  const tape = input.split(' ').map(Number) as ITape;
  return tape;
}

/**
 * Execute a calculation
 * - it's either a function (predefined)
 * - or a string (user-input, run with `eval`)
 */
function executeCalculation(
  calculation: CalculationFn['fn'],
  currentPosition: number,
  currentValue: number,
  nextValue: number,
  direction: Direction,
) {
  if (typeof calculation === 'string') {
    const params = [currentPosition, currentValue, nextValue];
    return eval(`(${calculation})(${params.join(',')})`)
  }

  return calculation(currentPosition, currentValue, nextValue, direction)
}
