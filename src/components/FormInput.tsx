import classNames from "classnames";

interface FormInputProps {
  className?: string;
  type?: 'text' | 'textarea' | 'number';
  info?: string;
  label?: string;

  name: string;

  value?: string | number;
  defaultValue?: string | number;
  placeholderValue?: string;

  min?: number;
  max?: number;
}

export function FormInput(props: FormInputProps & {
  type: 'text' | 'textarea';
  min?: void;
  max?: void;
}): React.ReactElement
export function FormInput(props: FormInputProps & {
  type: 'number';
  min: number;
  max: number;
}): React.ReactElement
export function FormInput(props: FormInputProps): React.ReactElement {
  const {
    className = '',
    defaultValue,
    info,
    label = 'Input',
    max,
    min,
    name,
    placeholderValue,
    type = 'text',
    value,
  } = props;

  return (
    <div className="grid grid-cols-10 grid-rows-1 gap-2">
      <label className="col-span-2" htmlFor={name}>{label}:</label>
      <div className="col-span-8 flex flex-col items-center">
        {(type === 'text') ? (
          <input
            className={classNames(className, 'w-full m-0!')}
            defaultValue={defaultValue}
            max={10e10}
            min={-10e10}
            name={name}
            onChange={() => { }}
            placeholder={placeholderValue}
            type="text"
            value={value}
          />
        ) : null}
        {(type === 'textarea') ? (
          <textarea
            className={classNames(className, 'w-full m-0! resize-none')}
            defaultValue={defaultValue}
            name={name}
            onChange={() => { }}
            placeholder={placeholderValue}
            rows={10}
            value={value}
          />
        ) : null}
        {(type === 'number') ? (
          <input
            className={classNames(className, 'w-full m-0!')}
            defaultValue={defaultValue}
            min={min}
            max={max}
            name={name}
            onChange={() => { }}
            placeholder={placeholderValue}
            type="number"
            value={value}
          />
        ) : null}
        <p className="text-slate-400 w-full whitespace-pre">{info}</p>
      </div>
    </div>
  )
}