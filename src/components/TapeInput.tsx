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
    <div className="containerBox grid grid-rows-1 grid-cols-12 gap-2">
      <div className="flex space-x-2 col-span-2 items-center">
        <label htmlFor="inputValue">Input:</label>
        <input
          className="w-full"
          disabled={running}
          id="inputValue"
          name="inputValue"
          onChange={(e) => setInitialInputValue(Math.max(0, +e.target.value))}
          type="number"
          value={input}
        />
      </div>
      <div className="flex space-x-2 col-span-8 items-center" title="Input a list of numbers separated by spaces, like: '0 1123 0 -1 0 0 4 5'">
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
      <div className="flex space-x-2 col-span-2 items-center" title="Time it takes for the tape to advance (in ms, default 500 = half a second)">
        <label htmlFor="inputSpeed">Speed:</label>
        <input
          className="w-full"
          disabled={running}
          id="inputSpeed"
          name="inputSpeed"
          onChange={e => setStepMs(+e.target.value)}
          type="number"
          value={stepMs}
        />
      </div>
    </div>
  )
}
