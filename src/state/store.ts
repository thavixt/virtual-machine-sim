import { create } from 'zustand'
import { ITape } from '../components/Tape';
import { Edge } from '@xyflow/react';
import { AppNode, DEFAULT_NODES } from '../flow/nodes';
import { DEFAULT_EDGES } from '../flow/edges';
import { ProcessType } from '../flow/nodes/TuringNode';
import { Calculation, CALCULATIONS } from '../logic/calculations';
import { ErrorMessage } from '../types';

const DEFAULT_CALCULATION: Calculation = 'add';
const DEFAULT_LOGS: string[] = [];
const DEFAULT_POSITION = -1;
const DEFAULT_TAPE: ITape = [0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1];
const DEFAULT_VALUE = 1;

export const HALT_NODE = 'halt';
export const START_NODE = 'inputStart';
export const STEP_MS = 500;

interface TuringState {
  // logging
  logs: string[];
  addLog: (log: string) => void;

  // react-flow
  edges: Edge[];
  nodes: AppNode[];
  addEdge: (edge: Edge) => void;
  addNode: (node: AppNode) => void;

  // tape
  halted: boolean;
  position: number;
  tape: ITape;
  setHalted: (halted?: boolean) => void;
  setTape: (tape: ITape) => void;

  // turing machine
  calculation: Calculation;
  currentProcess: ProcessType;
  currentValue: number;
  initialInputValue: number;
  calculate: () => Promise<Error | null>;
  clear: () => void;
  setCalculation: (calc: Calculation) => void;
  setCurrentProcess: (c: ProcessType) => void;
  setInitialInputValue: (input: number) => void;
  step: () => void;

  running: boolean;
  setRunning: (running: boolean) => void;
}

export const useTuringStore = create<TuringState>()((set) => ({
  running: false,
  setRunning: (running) => set((state) => ({ ...state, running })),
  // turing machine
  calculation: DEFAULT_CALCULATION,
  currentProcess: 'input',
  initialInputValue: DEFAULT_VALUE,
  currentValue: DEFAULT_VALUE,
  setInitialInputValue: (input: number) => set((state) => ({ ...state, initialInputValue: input })),
  calculate: async () => {
    let error: Error | null = null;
    set((state) => {
      if (state.currentProcess !== 'calc') {
        return { ...state };
      }

      if (state.position >= state.tape.length - 1) {
        error = new Error('Tape finished');
        return { ...state, currentProcess: 'halt', running: false };
      }

      const nextPosition = state.position + 1;
      const currentValue = state.currentValue;
      const nextValue = state.tape[nextPosition];

      const nextState = {
        ...state,
        position: nextPosition,
      };

      const fn = state.calculation;
      const logPrefix = 'calculating:';
      const logFn = `${fn}(${currentValue}, ${nextValue})`;
      let log = ``;
      let result = currentValue;

      try {
        result = CALCULATIONS[state.calculation].fn(currentValue, nextValue);
        console.log('result', result);
      } catch (e) {
        const calcError = e as Error;
        error = calcError;
        const errorMessage = JSON.parse(calcError.message) as ErrorMessage;

        log = `${logPrefix} ${logFn} -> ${errorMessage.result}`;

        return {
          ...nextState,
          currentValue: errorMessage.result,
          currentProcess: 'halt',
          logs: [...state.logs, log, errorMessage.message],
          running: false,
        }
      }

      log = `${logPrefix} ${logFn} -> ${result}`
      return {
        ...nextState,
        currentValue: result,
        logs: [...state.logs, log],
      };
    })
    return error;
  },
  clear: () => set((state) => ({
    ...state,
    currentProcess: 'input',
    halted: false,
    logs: [],
    position: DEFAULT_POSITION,
    currentValue: state.initialInputValue,
  })),
  setCalculation: (calculation) => set((state) => ({ ...state, calculation })),
  setCurrentProcess: (c: ProcessType) => set((state) => ({ ...state, currentProcess: c })),

  // react-flow
  edges: DEFAULT_EDGES,
  nodes: DEFAULT_NODES,
  addEdge: (edge: Edge) => set((state) => ({ ...state, edges: [...state.edges, edge] })),
  addNode: (node: AppNode) => set((state) => ({ ...state, nodes: [...state.nodes, node] })),

  // tape
  halted: false,
  position: DEFAULT_POSITION,
  tape: DEFAULT_TAPE,
  setHalted: (halted = true) => set((state) => ({ ...state, halted })),
  setTape: (tape) => set((state) => ({ ...state, tape })),
  step: () => set((state) => ({ ...state, position: state.position + 1 })),

  // logging
  logs: DEFAULT_LOGS,
  addLog: (log: string) => set((state) => ({ ...state, logs: [...state.logs, log] })),
}))
