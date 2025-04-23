import classNames from "classnames";
import { useVirtualStore } from "../state";

export function StepCounter() {
  const currentProcess = useVirtualStore(state => state.currentProcess);
  const position = useVirtualStore(state => state.position);

  const halted = (currentProcess === 'halt');

  return (
    <div className={classNames(
      'rounded-md flex place-items-center px-2 text-center text-sm',
      { 'bg-red-500 text-gray-100': halted },
    )}>
      {halted ? (
        <span>Halted: #{position + 1}</span>
      ) : (
        <span>Step: #{position + 1}</span>
      )}
    </div>
  )
}