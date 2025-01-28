import { useTuringStore } from "../state/store";

export function OperationsLog() {
  const logs = useTuringStore(state => state.logs);

  return (
    <div className="containerBox flex flex-col min-h-0 h-full">
      Operations:
      <div className="overflow-y-auto">
        <div className="flex flex-col-reverse">
          {logs.map((_, i) => (
            <p key={i}>#{i}:</p>
          ))}
        </div>
      </div>
    </div>
  )
}