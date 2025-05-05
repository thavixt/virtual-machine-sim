import { CalculationFn, ErrorMessage, Calculation } from "../types";

const turingMachine: CalculationFn['fn'] = (step, instructions, input, tapeDirection) => {
  // Verify the input is valid
  if (![0, 1].includes(+input)) {
    const errorMessage: ErrorMessage = {
      reason: `HALT - input invalid, or tape ran out`,
      result: -1,
    };
    const msg = JSON.stringify(errorMessage as ErrorMessage)
    throw new Error(msg);
  }

  // provide a default instruction for the first step, since it'll be an unrelated number
  const lastInstructions = step === 0 ? 'AAA' : instructions;

  // verify the received instruction return from the previous step
  let currentRule = lastInstructions.toString()[2].toString() as 'A' | 'B';
  if (!['A', 'B'].includes(currentRule)) {
    console.warn(`Turing machine used defalt rule A, received input ${instructions}`)
    currentRule = 'A';
  }
  // verify the received input
  if (![0, 1].includes(input)) {
    const errorMessage: ErrorMessage = {
      reason: `Invalid input for Turing machine (0 | 1): ${typeof input} ${input}`,
      result: -1,
    };
    const msg = JSON.stringify(errorMessage as ErrorMessage)
    throw new Error(msg);
  }
  const turingInput = input as 0 | 1;

  // get the next instruction based on the current input
  const ruleTable = {
    A: { 0: '1RB', 1: 'HALT' },
    B: { 0: '1LA', 1: '0RB' },
  };
  // based on the rule returned by the previous step
  const currentRuleColumn = ruleTable[currentRule];
  // based on the last input
  const nextInstruction = currentRuleColumn[turingInput];

  // verify the next instruction
  if (nextInstruction === 'HALT') {
    const errorMessage: ErrorMessage = {
      reason: `Turing machine received the HALT instruction`,
      result: -1,
    };
    const msg = JSON.stringify(errorMessage as ErrorMessage)
    throw new Error(msg);
  }
  const number = nextInstruction[0];
  const toWrite = +number;
  const toMove = nextInstruction[1] as string;
  const nextRule = nextInstruction[2] as 'A' | 'B';
  if (![0, 1].includes(toWrite) || !['L', 'R'].includes(toMove) || !['A', 'B'].includes(nextRule)) {
    const errorMessage: ErrorMessage = {
      reason: `Invalid rule for Turing machine: ${typeof nextInstruction} ${nextInstruction} - write ${toWrite}, move ${toMove}, next rule ${nextRule}`,
      result: -1,
    };
    const msg = JSON.stringify(errorMessage as ErrorMessage)
    throw new Error(msg);
  }

  // perform write
  window.$vm_write(toWrite);

  // perform move (direction change if needed)
  const currentDirection = tapeDirection === 'forward' ? 'R' : 'L';
  if (currentDirection !== toMove) {
    window.$vm_reverse();
  }

  return nextInstruction;
};

const sumCalc: CalculationFn['fn'] = (_step, current, input) => {
  const result = +current + input;
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
  const result = +current - input;
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
  const result = +current + step;
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
  const result = +current + input;
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
  const result = +current + input;
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
  turing: {
    name: 'Turing machine',
    description: `Run a Turing machine with the following instructions:

\t\t\t\t\tRead 0\t\tRead 1
Rule A:\t\t\t1RB\t\tHALT
Rule B:\t\t\t1LA\t\t0RB

Instructions consist of:
[1]: a value to write to tape
[2]: the direction to advance next
[3]: a rule to follow next

Starting rule is Rule B.`,
    tip: 'Provide a tape of 1s as 0s only',
    fn: turingMachine,
  },
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
