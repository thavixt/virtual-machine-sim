import { useTuringStore } from "../state";

export function OperationsLog() {
  const logs = useTuringStore(state => state.logs);

  return (
    <div className="overflow-y-auto h-full border border-t-color5 rounded-md p-2">
      <div className="flex flex-col-reverse text-gray-500">
        {logs.map((log, i) => (
          <p key={i}><b>#{i + 1}:</b>{' '}<small>{log}</small></p>
        ))}
      </div>
    </div>
  )
}