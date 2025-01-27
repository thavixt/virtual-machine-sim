import { Container } from "./Container"
import { Flow } from "./flow/Flow"

function App() {
  return (
    <div className="h-full w-full grid grid-cols-1 grid-rows-2 gap-2">

      <div className="w-screen flex flex-col space-y-2">
        <div className="containerBox text-center">
          <h1>Turing machine simulator</h1>
        </div>
        <div className="containerBox flex flex-col min-h-0">
          <div className="overflow-y-auto">
            <div className="flex flex-col">
              {new Array(100).fill(0).map((_, i) => (
                <p key={i}>Stuff....</p>
              ))}
            </div>
          </div>
        </div>

        <div className="containerBox">
          Create tape here
        </div>
        <div className="containerBox">
          Tape rolling here
        </div>
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
