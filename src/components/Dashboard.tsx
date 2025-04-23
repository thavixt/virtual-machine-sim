import { DashboardButtons } from "./DashboardButtons";
import { OperationsLog } from "./OperationsLog";

export function Dashboard() {
  return (
    <div className="containerBox min-h-0 h-full grid grid-cols-1 md:grid-cols-10 gap-2">
      <div className="w-full md:col-span-3">
        <DashboardButtons />
      </div>
      <div className="md:col-span-7 w-full flex flex-col min-h-0 h-full">
        <OperationsLog />
      </div>
    </div>
  )
}