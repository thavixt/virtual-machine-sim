import classNames from "classnames";
import { useTuringStore } from "../state/store";

export function StepCounter() {
  const position = useTuringStore(state => state.position);
  const halted = useTuringStore(state => state.halted);
  console.log({position, halted});

  const cls = classNames(
    'rounded-md p-2 w-28 flex place-items-center',
    {'bg-red-500 text-gray-100': halted},
  );

  return (
    <div className={cls}>
      Step: #{position}
    </div>
  )
}