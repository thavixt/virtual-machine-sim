import { create } from 'zustand'
import { CALCULATIONS } from '../logic/calculations';
import { Calculation, ErrorMessage, ITape, ProcessType } from '../types';

const DEFAULT_CALCULATION: Calculation = 'sumStep';
const DEFAULT_LOGS: string[] = [];
const DEFAULT_POSITION = -1;
const DEFAULT_STEP_MS = 200;
const DEFAULT_TAPE: ITape = Array(50).fill(0).map(() => [0,1,2,3,4,5,6,7,8,9,10]).flat();
const DEFAULT_VALUE = 1;

export const HALT_NODE = 'halt';
export const START_NODE = 'inputStart';

interface TuringState {
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

  // turing machine
  calculation: Calculation;
  currentProcess: ProcessType;
  currentValue: number;
  initialInputValue: number;
  stepMs: number;
  calculate: () => Promise<Error | null>;
  reset: () => void;
  setCalculation: (calc: Calculation) => void;
  setCurrentProcess: (c: ProcessType) => void;
  setInitialInputValue: (input: number) => void;
  setStepMs: (ms: number) => void;
  step: () => void;

  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
}

export const useTuringStore = create<TuringState>()((set) => ({
  // turing machine
  stepMs: DEFAULT_STEP_MS,
  isRunning: false,
  setStepMs: (stepMs: number) => set(() => ({ stepMs })),
  setIsRunning: (running) => set(() => ({ isRunning: running })),

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
        result = CALCULATIONS[state.calculation].fn(currentPosition, currentValue, nextValue);
      } catch (e) {
        const calcError = e as Error;
        error = calcError;
        const errorMessage = JSON.parse(calcError.message) as ErrorMessage;

        log = `${logPrefix} ${logFn} -> ${errorMessage.result}`;

        return {
          currentValue: errorMessage.result,
          currentProcess: 'halt',
          logs: [...state.logs, log, errorMessage.message],
          isRunning: false,
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
  step: () => set((state) => ({ position: state.position + 1 })),

  // logging
  logs: DEFAULT_LOGS,
  addLog: (log: string) => set((state) => ({ logs: [...state.logs, log] })),
}))
