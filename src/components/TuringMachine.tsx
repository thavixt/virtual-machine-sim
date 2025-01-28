import { useCallback, useEffect, useState } from "react";
import { StepCounter } from "./StepCounter";
import { Tape } from "./Tape";
import { useTuringStore } from "../state/store";

export function TuringMachine() {
  const tape = useTuringStore(state => state.tape);
  const step = useTuringStore(state => state.step);
  const clear = useTuringStore(state => state.clear);
  const setHalted = useTuringStore(state => state.setHalted);
  const position = useTuringStore(state => state.position);

  const [timer, setTimer] = useState<number | null>(null)

  const reset = useCallback(() => {
    clear();
  }, [clear])

  const stopTimer = useCallback(() => {
    if (timer) {
      clearInterval(timer);
    }
    setTimer(null);
  }, [timer])

  const startTimer = useCallback(() => {
    reset();
    const t = setInterval(() => {
      step();
    }, 100)
    setTimer(t);
  }, [reset, step])

  useEffect(() => {
    if (position === tape.length - 1) {
      stopTimer();
      setHalted();
    }
  }, [position, setHalted, stopTimer, tape.length])

  return (
    <div className="containerBox flex px-2 space-x-2">
      <div className="flex space-x-2 items-center">
        <button type="button" className="start" disabled={!!timer} onClick={startTimer}>Start</button>
        <button type="button" className="stop" disabled={!timer} onClick={stopTimer}>Stop</button>
        <button type="button" className="reset" disabled={!!timer} onClick={reset}>Reset</button>
      </div>
      <StepCounter />
      <Tape />
    </div>
  )
}
