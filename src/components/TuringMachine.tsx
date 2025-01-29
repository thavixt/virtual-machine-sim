import { useCallback, useState } from "react";
import { StepCounter } from "./StepCounter";
import { Tape } from "./Tape";
import { STEP_MS, useTuringStore } from "../state/store";
import { sleep } from "../logic/utils";

export function TuringMachine() {
  const clear = useTuringStore(state => state.clear);
  const setCurrent = useTuringStore(state => state.setCurrentProcess);
  const calculate = useTuringStore(state => state.calculate);
  const running = useTuringStore(state => state.running);
  const setRunning = useTuringStore(state => state.setRunning);
  const [stopped, setStopped] = useState(false);

  const stop = useCallback(() => {
    // @todo fix to aaactually stop the tape/machine
    setRunning(false);
    setStopped(true);
  }, [setRunning])

  const performCalculation = useCallback(async () => {
    if (stopped) {
      return;
    }
    setRunning(true);
    setCurrent('input');
    await sleep(STEP_MS / 2);

    setCurrent('calc');
    const error = await calculate();
    if (error) {
      console.warn(error);
      return;
    }
    
    await sleep(STEP_MS / 2);
    // tail call
    await performCalculation();
  }, [calculate, setCurrent, setRunning, stopped]);

  const start = useCallback(() => {
    clear();
    performCalculation();
  }, [clear, performCalculation])

  return (
    <div className="containerBox flex px-2 space-x-2">
      <div className="flex space-x-2 items-center">
        <button type="button" className="start" disabled={!!running} onClick={start}>Start</button>
        <button type="button" className="stop" disabled={!running} onClick={stop}>Stop</button>
        <button type="button" className="reset" disabled={!!running} onClick={clear}>Reset</button>
      </div>
      <Value/>
      <StepCounter />
      <Tape />
    </div>
  )
}

function Value() {
  const currentValue = useTuringStore(state => state.currentValue);

  return (
    <div className="flex items-center self-center bg-gray-300 rounded-md px-2 h-8">
      Current value: {currentValue}
    </div>
  )
}