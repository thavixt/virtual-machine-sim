import { useVirtualStore } from "../state";

export function TapeInput() {
  const input = useVirtualStore(state => state.initialInputValue);
  const running = useVirtualStore(state => state.isRunning);
  const setInitialInputValue = useVirtualStore(state => state.setInitialInputValue);
  const setStepMs = useVirtualStore(state => state.setStepMs);
  const setTapeString = useVirtualStore(state => state.setTapeString);
  const stepMs = useVirtualStore(state => state.stepMs);
  const tapeString = useVirtualStore(state => state.tapeString);

  const setTape = (input: string) => {
    // only 1s and 0s are allowed, separated by spaces
    setTapeString(input);
  }

  return (
    <div className="containerBox flex flex-col md:flex-row gap-2">
      <div className="flex gap-2">
        <div className="flex space-x-1 items-center" title="Time it takes for the tape to advance (in ms, default 500 = half a second)">
          <label htmlFor="inputSpeed">Speed (ms):</label>
          <input
            className="w-24"
            disabled={running}
            id="inputSpeed"
            name="inputSpeed"
            onChange={e => setStepMs(+e.target.value)}
            type="number"
            value={stepMs}
          />
        </div>
        <div className="flex space-x-1 items-center" title="Initial value">
          <label htmlFor="inputValue">Input:</label>
          <input
            className="w-16"
            disabled={running}
            id="inputValue"
            name="inputValue"
            onChange={(e) => setInitialInputValue(Math.max(0, +e.target.value))}
            type="number"
            value={input}
          />
        </div>
      </div>
      <div className="flex w-full space-x-1 items-center" title="Input a list of numbers separated by spaces, like: '0 1123 0 -1 0 0 4 5'">
        <label htmlFor="inputTape">Tape:</label>
        <input
          className="w-full"
          disabled={running}
          id="inputTape"
          name="inputTape"
          onChange={e => setTape(e.target.value)}
          pattern="[0-9\s]+"
          type="text"
          value={tapeString}
        />
      </div>
    </div>
  )
}
