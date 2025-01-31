import classNames from "classnames";
import { useTuringStore } from "../state";

export function StepCounter() {
  const currentProcess = useTuringStore(state => state.currentProcess);
  const position = useTuringStore(state => state.position);

  const halted = (currentProcess === 'halt');

  return (
    <div className={classNames(
      'rounded-md flex place-items-center px-2 text-center text-sm',
      { 'bg-red-500 text-gray-100': halted },
    )}>
      {halted ? (
        <span>Halted at step: #{position + 1}</span>
      ) : (
        <span>Step: #{position + 1}</span>
      )}
    </div>
  )
}