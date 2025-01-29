import classNames from "classnames";
import { useTuringStore } from "../state/store";

export function StepCounter() {
  const position = useTuringStore(state => state.position);
  const halted = useTuringStore(state => state.halted);

  const cls = classNames(
    'rounded-md p-2 flex place-items-center',
    { 'bg-red-500 text-gray-100': halted },
  );

  if (position < 0) {
    return <div className={cls}>-</div>
  }

  return (
    <div className={cls}>
      {halted ? (
        <span>Halted at step: #{position + 1}</span>
      ): (
        <span>Step: #{position + 1}</span>
      )}
    </div>
  )
}