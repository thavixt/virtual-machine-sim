import { ErrorMessage } from "../types";

export type Calculation = 'add' | 'sub';

export interface CalculationFn {
  name: string;
  description: string;
  fn: (...inputs: number[]) => number;
}

export const CALCULATIONS: Record<Calculation, CalculationFn> = {
  add: {
    name: 'Sum [add]',
    description: 'Sum current and next values, halt if divisible by 5',
    fn: (input1, input2) => {
      const result = input1 + input2;
      console.log(input1, input2, result);
      if (!(result % 5)) {
        const errorMessage: ErrorMessage = {
          message: `${result} is divisible by 5 ((${input1} + ${input2}) % 5 = ${result / 5}), halting`,
          result: result,
        };
        const msg = JSON.stringify(errorMessage as ErrorMessage)
        throw new Error(msg);
      }
      return result;
    },
  },
  sub: {
    name: 'Subtract [sub]',
    description: 'Subtract the next value from the current value, halt if divisible by 4',
    fn: (input1, input2) => {
      const result = input1 - input2;
      if (!(result % 4)) {
        const errorMessage: ErrorMessage = {
          message: `${result} is divisible by 4 ((${input1} - ${input2}) % 4 = ${result / 4}), halting`,
          result: result,
        };
        const msg = JSON.stringify(errorMessage as ErrorMessage)
        throw new Error(msg);
      }
      return result;
    },
  }
}