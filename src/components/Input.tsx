interface FormInputProps {
  className?: string;
  type?: 'text' | 'textarea';
  info?: string;
  label?: string;

  name: string;

  value?: string;
  defaultValue?: string;
  placeholderValue?: string;
}

export function FormInput({
  className,
  defaultValue,
  info,
  label = 'Input',
  name,
  placeholderValue,
  type = 'text',
  value,
}: FormInputProps) {
  return (
    <div className="grid grid-cols-10 grid-rows-1">
      <label className="col-span-2" htmlFor={name}>{label}:</label>
      <div className="col-span-8 flex flex-col items-center">
        {(type === 'textarea') ? (
          <textarea
            className={`w-full resize-none ${className}`}
            defaultValue={defaultValue}
            name={name}
            placeholder={placeholderValue}
            rows={10}
            onChange={() => { }}
            value={value}
          />
        ) : (
          <input
            className={`w-full ${className}`} type="text"
            defaultValue={defaultValue}
            name={name}
            value={value}
            onChange={() => { }}
            placeholder={placeholderValue}
          />
        )}
        <p className="text-slate-400 w-full whitespace-pre">{info}</p>
      </div>
    </div>
  )
}