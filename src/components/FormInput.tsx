import classNames from "classnames";

interface FormInputPropsDefault {
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

type FormInputProps = FormInputPropsDefault & ({
  type: 'number';
  min: number;
  max: number;
} | {
  min: void;
  max: void;
})

// interface FormInputProps {
//   className?: string;
//   type?: 'text' | 'textarea' | 'number';
//   info?: string;
//   label?: string;

//   name: string;

//   value?: string | number;
//   defaultValue?: string | number;
//   placeholderValue?: string;
// }

export function FormInput({
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
}: FormInputProps) {
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
        ): null}
        <p className="text-slate-400 w-full whitespace-pre">{info}</p>
      </div>
    </div>
  )
}