import classNames from "classnames";
import { useTuringStore } from "../state/store";
import { useRef, useEffect } from "react";

export type ITape = (-1 | 0 | 1)[];


export function Tape() {
  const position = useTuringStore(state => state.position);
  const tape = useTuringStore(state => state.tape);

  return (
    <div className="min-w-0 flex flex-col p-2 justify-center">
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
    if (ref.current) {
      ref.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [current]);
  
  const classes = classNames({
    'border-t-color2 border-2': current,
    'border-t-color3': !current,
  }, 'border-t-2 rounded-sm w-4 text-center')
  return (
    <div ref={ref} className={classes}>{value}</div>
  )
}
