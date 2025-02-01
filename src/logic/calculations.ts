import { Calculation, CalculationFn, ErrorMessage } from "../types";

export const CALCULATIONS: Record<Calculation, CalculationFn> = {
  sum: {
    name: 'Sum value',
    description: 'Sum current and next values, halt if divisible by 5',
    tip: 'Start with a small input number and wait until the counter reaches a number divisible by 5',
    fn: (_, currentValue, input1) => {
      const result = currentValue + input1;
      if (!(result % 5)) {
        const errorMessage: ErrorMessage = {
          message: `${result} is divisible by 5 ((${currentValue} + ${input1}) % 5 = ${result / 5}) => halt`,
          result: result,
        };
        const msg = JSON.stringify(errorMessage as ErrorMessage)
        throw new Error(msg);
      }
      return result;
    },
  },
  sumStep: {
    name: 'Step sum',
    description: 'Increment by the current step counter, halt when reaching 1000',
    fn: (step, currentValue) => {
      const result = currentValue + step;
      if (result >= 1000) {
        const errorMessage: ErrorMessage = {
          message: `${currentValue} + ${step}) >= ${1000}) => halt`,
          result: result,
        };
        const msg = JSON.stringify(errorMessage as ErrorMessage)
        throw new Error(msg);
      }
      return result;
    },
  },
  sub: {
    name: 'Subtract value',
    description: 'Subtract the next value from the current value, halt if divisible by 4',
    tip: 'Start with a bigger number and wait until the counter descends to a number divisible by 4',
    fn: (_step, currentValue, input1) => {
      const result = currentValue - input1;
      if (!(result % 4)) {
        const errorMessage: ErrorMessage = {
          message: `${result} is divisible by 4 ((${currentValue} - ${input1}) % 4 = ${result / 4}) => halt`,
          result: result,
        };
        const msg = JSON.stringify(errorMessage as ErrorMessage)
        throw new Error(msg);
      }
      return result;
    },
  },
}
