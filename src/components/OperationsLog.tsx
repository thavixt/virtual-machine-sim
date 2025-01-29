import { useTuringStore } from "../state/store";

export function OperationsLog() {
  const logs = useTuringStore(state => state.logs);

  return (
    <div className="flex flex-col min-h-0 h-full w-1/2">
      <div className="overflow-y-auto h-full border border-t-color3 rounded-md p-2">
        <div className="flex flex-col-reverse text-gray-500">
          {logs.map((log, i) => (
            <p key={i}><b>#{i+1}:</b>{' '}<small>{log}</small></p>
          ))}
        </div>
      </div>
    </div>
  )
}