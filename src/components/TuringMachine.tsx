import { useCallback } from "react";
import { StepCounter } from "./StepCounter";
import { Tape } from "./Tape";
import { TuringAction, TurningState, useTuringStore } from "../state";
import { sleep } from "../logic/utils";

export function TuringMachine() {
  const calculate = useTuringStore(state => state.calculate);
  const reset = useTuringStore(state => state.reset);
  const running = useTuringStore(state => state.isRunning);
  const setCurrent = useTuringStore(state => state.setCurrentProcess);
  const setRunning = useTuringStore(state => state.setIsRunning);
  const step = useTuringStore(state => state.step);
  const stepMs = useTuringStore(state => state.stepMs);

  const performCalculation = useCallback(async () => {
    setRunning(true);

    step();
    setCurrent('input');
    await sleep(stepMs / 2);

    setCurrent('calc');
    await sleep(stepMs / 2);
    const error = await calculate();
    if (error) {
      console.warn(error);
      return;
    }
    
    if (!TurningState.isRunning()) {
      return;
    }
    await performCalculation();
  }, [calculate, setCurrent, setRunning, step, stepMs]);

  const start = useCallback(() => {
    reset();
    performCalculation();
  }, [reset, performCalculation])

  return (
    <div className="containerBox flex px-2 space-x-2 items-center">
      <button
        type="button"
        className="start"
        disabled={!!running}
        onClick={start}
      >
        Start
      </button>
      <button
        type="button"
        className="stop"
        disabled={!running}
        onClick={TuringAction.stop}
      >
        Stop
      </button>
      <Tape />
      <Value />
      <StepCounter />
    </div>
  )
}

function Value() {
  const currentValue = useTuringStore(state => state.currentValue);

  return (
    <div className="bg-gray-300 rounded-md px-2 text-center text-sm">
      Value: {currentValue}
    </div>
  )
}