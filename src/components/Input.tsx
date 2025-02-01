export function FormInput({ defaultValue, name, label, type = 'text', info, className }: { defaultValue?: string; name: string; label: string; type?: 'text' | 'textarea'; info?: string; className?: string }) {
  return (
    <div className="grid grid-cols-10 grid-rows-1">
      <label className="col-span-2" htmlFor={name}>{label}:</label>
      <div className="col-span-8 flex flex-col items-center">
        {(type === 'textarea') ? (
          <textarea defaultValue={defaultValue} className={`w-full resize-none ${className}`} name={name} rows={10} />
        ) : (
          <input defaultValue={defaultValue} className={`w-full ${className}`} type="text" name={name} />
        )}
        <p className="text-slate-400 w-full whitespace-pre">{info}</p>
      </div>
    </div>
  )
}