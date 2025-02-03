import { ITape } from "../types";

type InitPhase = 'initial' | 'pending' | 'ready';

export interface IStore {
  init: () => Promise<void>;
  initPhase: InitPhase;

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
  calculations: Record<Calculation, CalculationFn>,
  currentProcess: ProcessType;
  currentValue: number;
  initialInputValue: number;
  stepMs: number;
  addCalculation: (calc: CalculationFn) => void,
  calculate: () => Promise<Error | null>;
  reset: () => void;
  setCalculation: (calc: Calculation) => void;
  setCurrentProcess: (c: ProcessType) => void;
  setInitialInputValue: (input: number) => void;
  setStepMs: (ms: number) => void;

  direction: Direction;
  // advance one `position` in `Direction`
  advance: () => void;
  // 'api'
  reverse: () => void;

  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
}