import { ErrorMessage } from "./types";

export type Calculation = 'add';

export interface CalculationFn {
  description: string;
  fn: (...inputs: number[]) => number;
}

export const CALCULATIONS: Record<Calculation, CalculationFn> = {
  add: {
    description: 'Sum current and next values, halt if divisible by 5',
    fn: (input1, input2) => {
      const result = input1 + input2;
      if (!(result % 5)) {
        const errorMessage: ErrorMessage = {
          message: `${result} is divisible by 5 (${input1} + ${input2}), halting`,
          result: result,
        };
        const msg = JSON.stringify(errorMessage as ErrorMessage)
        throw new Error(msg);
      }
      return result;
    },
  }
}