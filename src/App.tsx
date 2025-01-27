import { useState } from "react";
import { Container } from "./Container"
import { Flow } from "./flow/Flow"
import { ITape, Tape } from "./Tape";
import { Header } from "./Header";

function App() {
  const [tape, setTape] = useState<ITape>([0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1]);

  const setTapeString = (input: string) => {
    // only 1s and 0s allowed
    const cleaned = input.replace(new RegExp('([^01])'), '');
    const tapeValues = cleaned.split('').map(Number) as ITape;
    setTape(tapeValues);
  }

  return (
    <div className="h-full w-full grid grid-cols-1 grid-rows-2 gap-2">

      <div className="w-screen flex flex-col space-y-2">
        <Header />
        <div className="containerBox flex flex-col min-h-0">
          <div className="overflow-y-auto">
            <div className="flex flex-col-reverse">
              {new Array(100).fill(0).map((_, i) => (
                <p key={i}>Operation#{i}:</p>
              ))}
            </div>
          </div>
        </div>

        <div className="containerBox flex space-y-2" title="Input a tape of 1s and 0s, like: '0 1 0 0 1 1 1 0'">
          <label htmlFor="input">Input tape:</label>
          <input className="w-full" type="text" name="input" defaultValue={tape.join('')} onChange={e => setTapeString(e.target.value)} />
        </div>
        <Tape position={2} tape={tape} />
      </div>

      <Container>
        {(width, height) => (
          <div className="bg-slate-400" style={{ width, height }}>
            <Flow />
          </div>
        )}
      </Container>
    </div>
  )
}

export default App
