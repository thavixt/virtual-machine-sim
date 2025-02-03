import { FormInput } from "../FormInput";

export function CreateTapeDialog() {
  return (
    <div className="flex flex-col space-y-4">
      <FormInput
        label="Tape length"
        name="tapeLength"
        defaultValue={100}
        type="number"
        min={1}
        max={10e5}
      />
      <FormInput
        label="Minimum value"
        name="tapeMin"
        defaultValue={0}
        type="number"
        min={-10e10}
        max={10e10}
      />
      <FormInput
        label="Maximum value"
        name="tapeMax"
        defaultValue={999}
        type="number"
        min={-10e10}
        max={10e10}
      />
    </div >
  )
}