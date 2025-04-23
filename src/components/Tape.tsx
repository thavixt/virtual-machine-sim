import classNames from "classnames";
import { useRef, useEffect } from "react";
import { useVirtualStore } from "../state";
import { ITape } from "../types";

export function Tape() {
  const position = useVirtualStore(state => state.position);
  const tape = useVirtualStore(state => state.tape);

  return (
    <div className="min-w-0 flex flex-col justify-center w-full">
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="flex h-full">
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
    if (current) {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [current]);

  const classes = classNames({
    'border-t-color3': current,
    'border-transparent': !current,
  }, 'border-2 rounded-sm w-fit text-center px-1')
  return (
    <div ref={ref} className={classes}>{value}</div>
  )
}
