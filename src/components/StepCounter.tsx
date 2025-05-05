import classNames from "classnames";
import { useVirtualStore } from "../state";

export function StepCounter() {
  const currentProcess = useVirtualStore(state => state.currentProcess);
  const step = useVirtualStore(state => state.step);

  const halted = (currentProcess === 'halt');

  return (
    <div className={classNames(
      'w-16 rounded-md flex place-items-center px-2 text-center text-sm',
      { 'bg-red-500 text-gray-100': halted },
    )}>
      {halted ? (
        <span>Halted: #{step + 1}</span>
      ) : (
        <span>Step: #{step + 1}</span>
      )}
    </div>
  )
}