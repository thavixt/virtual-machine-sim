declare global {
  interface Window {
    $vm_reverse: () => void;
    $vm_write: (value: number) => void;
  }
}

export type Calculation = 'turing' | 'sum' | 'sumStep' | 'sub' | 'odd' | 'even' | string;
export interface CalculationFn {
  name: string;
  description: string;
  tip?: string;
  fn: ((
    step: number,
    currentValue: number | string,
    input: number,
    direction: Direction,
  ) => number | string) | string;
}

export type ProcessType = 'input' | 'calc' | 'halt';

export type ITape = Array<number>;
export interface TapeValueProps {
  value: ITape[number];
  current?: boolean;
}

export interface ErrorMessage {
  reason: string;
  result: number;
}

export type Direction = 'back' | 'forward';