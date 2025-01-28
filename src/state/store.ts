import { create } from 'zustand'
import { ITape } from '../components/Tape';

interface TuringState {
  tape: ITape;
  setTape: (tape: ITape) => void;

  position: number;
  step: () => void;

  halted: boolean;
  setHalted: (halted?: boolean) => void;

  logs: string[];
  addLog: (log: string) => void;

  clear: () => void;
}

const DEFAULT_TAPE: ITape = [0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1];
const DEFAULT_LOGS: string[] = [];

export const useTuringStore = create<TuringState>()((set) => ({
  tape: DEFAULT_TAPE,
  setTape: (tape) => set((state) => ({ ...state, tape })),

  position: 0,
  step: () => set(
    (state) => ({ ...state, position: state.position + 1 })
  ),

  halted: false,
  setHalted: (halted = true) => set(
    (state) => ({ ...state, halted })
  ),

  logs: DEFAULT_LOGS,
  addLog: (log: string) => set((state) => ({ ...state, logs: [...state.logs, log] })),

  clear: () => set((state) => ({
    ...state,
    position: 0,
    halted: false,
    logs: [],
  }))
}))
