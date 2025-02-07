import { CALCULATIONS } from "../../logic/calculations";
import { CodeEditor } from "../CodeEditor";
import { FormInput } from "../FormInput";
import { ListItem } from "../ListItem";

const PLACEHOLDER_NAME = `My custom function`;
const PLACEHOLDER_DESCRIPTION = `This method does x and y, and halts when z occurs`;
const PLACEHOLDER_FUNCTION_CODE = CALCULATIONS.even.fn.toString();
const PLACEHOLDER_TIP = `Optional: Describe a useful thing you can do with this`;

export function CreateDialog() {
  return (
    <div className="flex flex-col space-y-4">
      <FormInput
        type="text"
        label="Function name"
        name="calcName"
        placeholderValue={PLACEHOLDER_NAME}
      />
      <FormInput
        type="text"
        label="Description"
        name="calcDescription"
        placeholderValue={PLACEHOLDER_DESCRIPTION}
      />
      <CodeEditor
        defaultValue={PLACEHOLDER_FUNCTION_CODE}
        name="calcFunction"
      />
      <FormInput
        type="text"
        label="Tip"
        name="calcTip"
        placeholderValue={PLACEHOLDER_TIP}
      />
      <div className="flex flex-col space-y-2 text-gray-400 text-sm">
        <p>Methods available:</p>
        <div className="h-fit max-h-32 overflow-y-auto">
          <ul className="list-disc list-inside">
            <ListItem title="$vm_reverse()">reverse the direction the tape advances</ListItem>
          </ul>
        </div>
        <hr />
        <div>
          <p>The default code example is for the <code>even</code> method.</p>
          <p>It receives the index of the current <code>step</code> (unused), the current <code>value</code> and the next <code>input</code> from the tape, and returns their sum.
            If the result is even (divisible by 2), instead of returning it, the function throws an error, describing why the machine is halting.</p>
          <p>When throwing an <b>error</b>, do it as a <code>{'new Error({ message: "Something went wrong", result: 123 })'}</code>. The <code>result</code> is the would-be next value - which presumably is <b>halting</b> the machine</p>
        </div>
      </div>
    </div >
  )
}