import classNames from "classnames";
import { useRef, useEffect } from "react";
import { useTuringStore } from "../state";
import { ITape } from "../types";

export function Tape() {
  const position = useTuringStore(state => state.position);
  const tape = useTuringStore(state => state.tape);

  return (
    <div className="min-w-0 flex flex-col justify-center w-full">
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="flex h-full space-x-1">
          {tape.map((v, i) => (
            <TapeValue key={i} value={v} current={i === position} />
          ))}
        </div>
      </div>
    </div>
  )
}

export interface TapeValueProps {
  value: ITape[number];
  current?: boolean;
}

export function TapeValue({ current, value }: TapeValueProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && current) {
      ref.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [current]);

  const classes = classNames({
    'border-t-color2 border-2': current,
    'border-t-color3': !current,
  }, 'border-t-4 rounded-sm w-fit text-center px-1')
  return (
    <div ref={ref} className={classes}>{value}</div>
  )
}
