import { create } from 'zustand'
import { CALCULATIONS } from '../logic/calculations';
import { Calculation, CalculationFn, ErrorMessage, ITape, ProcessType } from '../types';
import { getRandomInt, getRandomKey, getRandomTape, sleep } from '../logic/utils';
import { IStore } from './IStore';

const DEFAULT_CALCULATION: Calculation = (() => {
  const value = getRandomKey(CALCULATIONS, 'add');
  console.debug('DEFAULT_CALCULATION:', value);
  return value;
})();
const DEFAULT_TAPE: ITape = (() => {
  const value = getRandomTape(getRandomInt(0, 100), 0, 100);
  console.debug('DEFAULT_TAPE:', value);
  return value;
})();

const DEFAULT_LOGS: string[] = [];
const DEFAULT_POSITION = -1;
const DEFAULT_STEP_MS = 200;
const DEFAULT_VALUE = 1;

export const useVirtualStore = create<IStore>()((set, get) => ({
  init: async () => {
    const phase = get().initPhase;
    if (['pending', 'ready'].includes(phase)) {
      return;
    }
    set(() => ({initPhase: 'pending'}))
    const ms = getRandomInt(250, 500);
    console.debug(`Init in ${ms}ms`)
    await sleep(ms);
    set(() => ({initPhase: 'ready'}))
  },
  // for now, skip the initialization stuff, @todo maybe do something interesting later
  initPhase: 'ready',

  // virtual machine
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
      if (state.currentProcess !== 'calc') {
        return {};
      }

      if (state.position >= state.tape.length) {
        error = new Error('Tape finished');
        return { currentProcess: 'halt', isRunning: false };
      }

      const currentPosition = state.position;
      const currentValue = state.currentValue;
      const nextValue = state.tape[state.position];

      const fn = state.calculation;
      // @todo
      const logPrefix = '';
      const logFn = `${fn}(${currentPosition}, ${currentValue}, ${nextValue})`;
      let log = ``;
      let result = currentValue;

      try {
        result = executeCalculation(CALCULATIONS[state.calculation].fn, currentPosition, currentValue, nextValue);
      } catch (e) {
        const calcError = e as Error;
        error = calcError;
        const errorMessage = JSON.parse(calcError.message) as ErrorMessage;

        log = `${logPrefix} ${logFn} -> ${errorMessage.result} (Halted, reason: ${errorMessage.reason})`;

        return {
          currentProcess: 'halt',
          currentValue: errorMessage.result,
          isRunning: false,
          logs: [...state.logs, log],
        }
      }

      log = `${logPrefix} ${logFn} -> ${result}`
      return {
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
  advance: () => set((state) => ({ position: state.position + (state.direction === 'forward' ? 1 : -1) })),

  // api
  reverse: () => set((state) => ({ direction: state.direction === 'back' ? 'forward' : 'back' })),

  // logging
  logs: DEFAULT_LOGS,
  addLog: (log: string) => set((state) => ({ logs: [...state.logs, log] })),
}))

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
): number {
  if (typeof calculation === 'string') {
    const params = [currentPosition, currentValue, nextValue];
    return eval(`(${calculation})(${params.join(',')})`)
  }

  return calculation(currentPosition, currentValue, nextValue)
}
