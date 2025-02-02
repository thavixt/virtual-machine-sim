import { Container } from "./components/Container"
import { Dashboard } from "./components/Dashboard"
import { Header } from "./components/Header"
import { TapeInput } from "./components/TapeInput"
import { VirtualMachine } from "./components/VirtualMachine"
import { Flow } from "./flow/Flow"

function App() {
  return (
    <div className="h-full w-full grid grid-cols-1 grid-rows-10 gap-2">
      <div className="w-full flex flex-col space-y-2 row-span-6">
        <Header />
        <Dashboard />
        <TapeInput />
        <VirtualMachine />
      </div>
      <div className="px-2 row-span-4">
        <Container>
          {(width, height) => (
            <div className="bg-slate-400" style={{ width, height }}>
              <Flow />
            </div>
          )}
        </Container>
      </div>
    </div>
  )
}

export default App
