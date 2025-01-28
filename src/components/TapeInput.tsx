import { useTuringStore } from "../state/store";
import { ITape } from "./Tape";

export function TapeInput() {
  const tape = useTuringStore(state => state.tape);
  const setTape = useTuringStore(state => state.setTape);

  const setTapeString = (input: string) => {
    // only 1s and 0s allowed
    const cleaned = input.replace(new RegExp('([^01])'), '');
    const tapeValues = cleaned.split('').map(Number) as ITape;
    setTape(tapeValues);
  }

  return (
    <div className="containerBox flex space-y-2" title="Input a tape of 1s and 0s, like: '0 1 0 0 1 1 1 0'">
      <label htmlFor="input">Input tape:</label>
      <input className="w-full" type="text" name="input" defaultValue={tape.join('')} onChange={e => setTapeString(e.target.value)} />
    </div>
  )
}
