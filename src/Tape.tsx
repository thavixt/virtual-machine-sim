import classNames from "classnames";

export type ITape = (0 | 1)[];

export interface TapeProps {
  position: number;
  tape: ITape;
}

export function Tape({ position, tape }: TapeProps) {
  return (
    <div className="containerBox flex flex-col">
      <div className="overflow-y-auto">
        <div className="flex h-6 space-x-1">
          {tape.map((v, i) => (
            <TapeValue key={i} value={v} current={i === position} />
          ))}
        </div>
      </div>
    </div>
  )
}

export interface TapeValueProps {
  value: 0 | 1;
  current?: boolean;
}

export function TapeValue({ current, value }: TapeValueProps) {
  const classes = classNames({
    'border-t-color2 border-2': current,
    'border-t-color3': !current,
  }, 'border-t-2 rounded-sm')
  return (
    <div className={classes}>{value}</div>
  )
}