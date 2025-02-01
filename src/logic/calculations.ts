import { Calculation, CalculationFn, ErrorMessage } from "../types";

const sumCalc: CalculationFn['fn'] = (_step, current, input) => {
  const result = current + input;
  if (!(result % 5)) {
    const errorMessage: ErrorMessage = {
      message: `${result} is divisible by 5 ((${current} + ${input}) % 5 = ${result / 5}) => halt`,
      result: result,
    };
    const msg = JSON.stringify(errorMessage as ErrorMessage)
    throw new Error(msg);
  }
  return result;
}
const sumStepCalc: CalculationFn['fn'] = (step, current) => {
  const result = current + step;
  if (result >= 1000) {
    const errorMessage: ErrorMessage = {
      message: `${result} reached 1000 ((${current} + ${step}) >= ${1000}) => halt`,
      result: result,
    };
    const msg = JSON.stringify(errorMessage as ErrorMessage)
    throw new Error(msg);
  }
  return result;
}
const subCalc: CalculationFn['fn'] = (_step, current, input) => {
  const result = current - input;
  if (!(result % 4)) {
    const errorMessage: ErrorMessage = {
      message: `${result} is divisible by 4 ((${current} - ${input}) % 4 = ${result / 4}) => halt`,
      result: result,
    };
    const msg = JSON.stringify(errorMessage as ErrorMessage)
    throw new Error(msg);
  }
  return result;
}
const evenCalc: CalculationFn['fn'] = (_step, current, input) => {
  const result = current + input;
  if (!(result % 2)) {
    const errorMessage: ErrorMessage = {
      message: `${result} is even ((${current} + ${input}) % 2 = ${result % 2}) => halt`,
      result: result,
    };
    const msg = JSON.stringify(errorMessage as ErrorMessage)
    throw new Error(msg);
  }
  return result;
}
const oddCalc: CalculationFn['fn'] = (_step, current, input) => {
  const result = current + input;
  if (result % 2) {
    const errorMessage: ErrorMessage = {
      message: `${result} is odd ((${current} + ${input}) % 2 = ${result % 2}) => halt`,
      result: result,
    };
    const msg = JSON.stringify(errorMessage as ErrorMessage)
    throw new Error(msg);
  }
  return result;
}

export const CALCULATIONS: Record<Calculation, CalculationFn> = {
  sum: {
    name: 'Sum value',
    description: 'Sum current and next values, halt if divisible by 5',
    tip: 'Start with a small input number and wait until the counter reaches a number divisible by 5',
    fn: sumCalc,
  },
  sumStep: {
    name: 'Step sum',
    description: 'Increment by the current step counter, halt when reaching 1000',
    fn: sumStepCalc,
  },
  sub: {
    name: 'Subtract value',
    description: 'Subtract the next value from the current value, halt if divisible by 4',
    tip: 'Start with a bigger number and wait until the counter descends to a number divisible by 4',
    fn: subCalc,
  },
  even: {
    name: 'Halt when even',
    description: 'Sum values, halt when the result is even',
    fn: evenCalc,
  },
  odd: {
    name: 'Halt when odd',
    description: 'Sum values, halt when the result is odd',
    fn: oddCalc,
  }
}
