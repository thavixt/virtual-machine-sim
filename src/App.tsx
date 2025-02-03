import { useEffect } from "react"
import { Container } from "./components/Container"
import { Dashboard } from "./components/Dashboard"
import { Header } from "./components/Header"
import { Spinner } from "./components/Spinner"
import { TapeInput } from "./components/TapeInput"
import { VirtualMachine } from "./components/VirtualMachine"
import { Flow } from "./flow/Flow"
import { useVirtualStore } from "./state"

function App() {
  const init = useVirtualStore(state => state.init);
  const initPhase = useVirtualStore(state => state.initPhase);

  useEffect(() => {
    init();
  }, [init])

  if (initPhase != 'ready') {
    return (
      <div className="size-full flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="h-full w-full grid grid-cols-1 grid-rows-10 gap-2 animate-appear">
      <div className="w-full flex flex-col space-y-1 row-span-6">
        <Header />
        <Dashboard />
        <TapeInput />
        <VirtualMachine />
      </div>
      <div className="px-2 row-span-4 flex">
        <Container>
          {(width, height) => <Flow key={`${width}x${height}`} />}
        </Container>
      </div>
    </div>
  )
}

export default App
