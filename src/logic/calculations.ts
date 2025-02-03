import { Calculation, CalculationFn, ErrorMessage } from "../types";

const sumCalc: CalculationFn['fn'] = (_step, current, input) => {
  const result = current + input;
  if (!(result % 10) && result != 0) {
    const errorMessage: ErrorMessage = {
      reason: `${result} is divisible by 10 ((${current} + ${input}) % 10 = ${result / 10}) => halt`,
      result: result,
    };
    const msg = JSON.stringify(errorMessage as ErrorMessage)
    throw new Error(msg);
  }
  return result;
}
const subCalc: CalculationFn['fn'] = (_step, current, input) => {
  const result = current - input;
  if (!(result % 9) && result != 0) {
    const errorMessage: ErrorMessage = {
      reason: `${result} is divisible by 9 ((${current} - ${input}) % 9 = ${result % 9})`,
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
      reason: `${result} reached 1000 ((${current} + ${step}) >= ${1000})`,
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
      reason: `${result} is odd ((${current} + ${input}) % 2 = ${result % 2})`,
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
      reason: `${result} is even ((${current} + ${input}) % 2 = ${result % 2})`,
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
    description: 'Sum current and next values, halt if divisible by 10',
    tip: 'Start with a small input number and wait until the counter reaches a number divisible by 10',
    fn: sumCalc,
  },
  sumStep: {
    name: 'Step sum',
    description: 'Increment by the current step counter, halt when reaching 1000',
    fn: sumStepCalc,
  },
  sub: {
    name: 'Subtract value',
    description: 'Subtract the next value from the current value, halt if divisible by 9',
    tip: 'Start with a bigger number and wait until the counter descends to a number divisible by 9',
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
