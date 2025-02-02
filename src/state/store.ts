import { create } from 'zustand'
import { CALCULATIONS } from '../logic/calculations';
import { Calculation, CalculationFn, ErrorMessage, ITape, ProcessType } from '../types';

const DEFAULT_CALCULATION: Calculation = 'even';
const DEFAULT_LOGS: string[] = [];
const DEFAULT_POSITION = -1;
const DEFAULT_STEP_MS = 300;
const DEFAULT_TAPE: ITape = Array(10).fill(0).map(() => [0, 0, 8, 1, 2, 3]).flat();
const DEFAULT_VALUE = 1;

export const HALT_NODE = 'halt';
export const START_NODE = 'inputStart';

interface VirtualState {
  // logging
  logs: string[];
  addLog: (log: string) => void;

  // react-flow
  // edges: Edge[];
  // nodes: AppNode[];
  // addEdge: (edge: Edge) => void;
  // addNode: (node: AppNode) => void;

  // tape
  position: number;
  tape: ITape;
  tapeString: string;
  setTape: (tape: ITape) => void;
  setTapeString: (tape: string) => void;

  // virtual machine
  calculation: Calculation;
  currentProcess: ProcessType;
  currentValue: number;
  initialInputValue: number;
  stepMs: number;
  addCalculation: (calc: CalculationFn) => void,
  calculations: Record<Calculation, CalculationFn>,
  calculate: () => Promise<Error | null>;
  reset: () => void;
  setCalculation: (calc: Calculation) => void;
  setCurrentProcess: (c: ProcessType) => void;
  setInitialInputValue: (input: number) => void;
  setStepMs: (ms: number) => void;
  // 'api'
  forward: (by?: number) => void;
  back: (by?: number) => void;

  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
}

export const useVirtualStore = create<VirtualState>()((set) => ({
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
    // calculation: DEFAULT_CALCULATION,
    currentProcess: 'halt',
    currentValue: state.initialInputValue,
    // initialInputValue: DEFAULT_VALUE,
    logs: [],
    position: DEFAULT_POSITION,
    // stepMs: DEFAULT_STEP_MS,
    // tape: DEFAULT_TAPE,
  })),
  setCalculation: (calculation) => set(() => ({ calculation })),
  setCurrentProcess: (c: ProcessType) => set(() => ({ currentProcess: c })),

  // react-flow
  // edges: DEFAULT_EDGES,
  // nodes: DEFAULT_NODES,
  // addEdge: (edge: Edge) => set((state) => ({ ...state, edges: [...state.edges, edge] })),
  // addNode: (node: AppNode) => set((state) => ({ ...state, nodes: [...state.nodes, node] })),

  // tape
  halted: false,
  position: DEFAULT_POSITION,
  tape: DEFAULT_TAPE,
  tapeString: DEFAULT_TAPE.join(' '),
  setTape: (tape) => set(() => ({ tape })),
  setTapeString: (tapeString: string) => set(() => {
    const tape = tapeString.split(' ').map(Number) as ITape;
    return {
      tape,
      tapeString
    };
  }),

  forward: (by = 1) => set((state) => ({ position: Math.min(state.position + by, state.tape.length) })),
  back: (by = 1) => set((state) => ({ position: Math.min(state.position - by, state.tape.length) })),

  // logging
  logs: DEFAULT_LOGS,
  addLog: (log: string) => set((state) => ({ logs: [...state.logs, log] })),
}))

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
