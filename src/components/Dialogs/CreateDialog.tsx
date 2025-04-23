import { CALCULATIONS } from "../../logic/calculations";
import { CodeEditor } from "../CodeEditor";
import { FormInput } from "../FormInput";
import { ListItem } from "../ListItem";

const PLACEHOLDER_NAME = `My virtual machine function`;
const PLACEHOLDER_DESCRIPTION = `This method does x or y, but halts when z occurs`;
const PLACEHOLDER_FUNCTION_CODE = CALCULATIONS.turing.fn.toString();
const PLACEHOLDER_TIP = `Describe a useful thing you can do with this, or what kind of tape to provide for it`;

export function CreateDialog() {
  return (
    <div className="flex flex-col space-y-4">
      <FormInput
        type="text"
        label="Function name"
        name="calcName"
        placeholderValue={PLACEHOLDER_NAME}
        required
      />
      <FormInput
        type="text"
        label="Description"
        name="calcDescription"
        placeholderValue={PLACEHOLDER_DESCRIPTION}
        required
      />
      <CodeEditor
        defaultValue={PLACEHOLDER_FUNCTION_CODE}
        name="calcFunction"
        required
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
            <ListItem title="$vm_reverse()">
              reverse the direction the tape advances
            </ListItem>
            <ListItem title="$vm_write(value: number)">
              write a number to the tape at the current position
            </ListItem>
          </ul>
        </div>
        <hr />
        <div className="text-xs">
          <p>When throwing an <b>error</b>, do it as a <code>{'new Error({ message: "Something went wrong", result: 123 })'}</code>. The <code>result</code> is the would-be next value - which presumably is causing the machine to <b>halt</b></p>
        </div>
      </div>
    </div >
  )
}