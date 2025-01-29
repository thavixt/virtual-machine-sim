import { useTuringStore } from "../state/store";
import { ITape } from "./Tape";

export function TapeInput() {
  const tape = useTuringStore(state => state.tape);
  const setTape = useTuringStore(state => state.setTape);
  const input = useTuringStore(state => state.initialInputValue);
  const setInitialInputValue = useTuringStore(state => state.setInitialInputValue);
  const running = useTuringStore(state => state.running);

  const setTapeString = (input: string) => {
    // only 1s and 0s allowed
    const cleaned = input.replace(new RegExp('([^01])'), '');
    const tapeValues = cleaned.split('').map(Number) as ITape;
    setTape(tapeValues);
  }

  return (
    <div className="containerBox flex space-x-2">
      <div className="flex space-x-2">
        <label htmlFor="inputnum">Input number:</label>
        <input
          className="w-16"
          disabled={running}
          id="inputnum"
          name="inputnum"
          onChange={(e) => setInitialInputValue(Math.max(0, +e.target.value))}
          type="number"
          value={input}
        />
      </div>
      <div className="flex space-x-2 w-full" title="Input a tape of 1s and 0s, like: '0 1 0 0 1 1 1 0'">
        <label htmlFor="input">Input tape:</label>
        <input className="w-full" type="text" name="input" defaultValue={tape.join(', ')} onChange={e => setTapeString(e.target.value)} />
      </div>
    </div>
  )
}
