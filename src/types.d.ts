export type Calculation = 'sum' | 'sumStep' | 'sub' | 'odd' | 'even' | string;
export interface CalculationFn {
  name: string;
  description: string;
  tip?: string;
  fn: ((step: number, currentValue: number, ...inputs: number[]) => number) | string;
}

export type ProcessType = 'input' | 'calc' | 'halt';

export type ITape = Array<number>;
export interface TapeValueProps {
  value: ITape[number];
  current?: boolean;
}

export interface ErrorMessage {
  message: string;
  result: number;
}
