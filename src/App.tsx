import { Container } from "./components/Container"
import { Header } from "./components/Header"
import { OperationsLog } from "./components/OperationsLog"
import { TapeInput } from "./components/TapeInput"
import { TuringMachine } from "./components/TuringMachine"
import { Flow } from "./flow/Flow"

function App() {
  return (
    <div className="h-full w-full grid grid-cols-1 grid-rows-2 gap-2">
      <div className="w-full flex flex-col space-y-2">
        <Header />
        <TapeInput />
        <OperationsLog />
        <TuringMachine />
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
