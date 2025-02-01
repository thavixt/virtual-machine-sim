import { CALCULATIONS } from "./calculations";
import { useVirtualStore } from "../state";
import { FormInput } from "../components/Input";
import { useMemo } from "react";
import { ListItem } from "../components/ListItem";
import { Calculation } from "../types";

export type DialogType = 'set' | 'create';

export interface DialogEntry {
  form: JSX.Element;
  title: string;
  onSubmit: (formData: FormData) => void | Promise<void>;
}

export type Dialogs = Record<DialogType, DialogEntry>;

const PLACEHOLDER_NAME = `My custom function`;
const PLACEHOLDER_DESCRIPTION = `This method does x and y, and halts when z occurs`;
const PLACEHOLDER_FUNCTION_CODE = CALCULATIONS.even.fn.toString();
const PLACEHOLDER_TIP = `Describe your function here ...`;

/**
 * @todo maybe this dialog list should just be a basic list of components instead of a hook, hm
 */
export function useDialogForms() {
  const running = useVirtualStore(state => state.isRunning);
  const setCalculation = useVirtualStore(state => state.setCalculation);
  const addCalculation = useVirtualStore(state => state.addCalculation);

  const dialogForms: Dialogs = useMemo(() => ({
    set: {
      title: 'Set the function the Virtual machine applies:',
      form: (
        <div className="flex space-x-4">
          <label htmlFor="calcName">Select a method:</label>
          <select name="calcName" id="calcName">
            <option value="">-- Choose an option --</option>
            {Object.entries(CALCULATIONS)
              .sort(([aKey], [bKey]) => aKey.localeCompare(bKey))
              .map(([key, value]) => {
                const tooltip = `${value.description}\n\nTip:\n${value.tip ?? '-'}`
                return (
                  <option
                    disabled={running}
                    key={key}
                    value={key}
                    title={tooltip}
                  >
                    [{key}] {value.name}
                  </option>
                )
              })}
          </select>
        </div>
      ),
      onSubmit: (formData: FormData) => {
        const calcName = formData.get('calcName') as Calculation;
        setCalculation(calcName);
      },
    },

    create: {
      title: 'Create a method for the Virtual machine to apply every step',
      form: (
        <div className="flex flex-col space-y-4">
          <FormInput name="calcName" label="Function name" defaultValue={PLACEHOLDER_NAME} />
          <FormInput name="calcDescription" label="Description" defaultValue={PLACEHOLDER_DESCRIPTION} />
          <FormInput name="calcFunction" label="Code (Javascript)" type="textarea" info={`JavaScript code`} className="font-mono" defaultValue={PLACEHOLDER_FUNCTION_CODE} />
          <FormInput name="calcTip" label="Tip" defaultValue={PLACEHOLDER_TIP} />
          <div className="flex flex-col space-y-2 text-gray-400">
            <div>
              <p>The example is for the <code>even</code> method.</p>
              <p>It receives the index of the current <b>step</b> (unused), the <b>current</b> value and the next <b>input</b> from the tape, and returns their sum.
                If the result would be even (divisible by 2), instead of returning it, the function throws an error, describing why the machine is halting.</p>
            </div>
            <hr />
            <p>Methods usable:</p>
            <div className="h-32 overflow-y-auto">
              <ul className="list-disc list-inside">
                <ListItem title="back(n: number)">set the tape backwards <code>n</code> steps</ListItem>
                <ListItem title="forward(n: number)">set the tape forwards <code>n</code> steps</ListItem>
                {/* @todo */}
                <ListItem title="TODO">other useful or interesting utils...</ListItem>
              </ul>
            </div>
          </div>
        </div >
      ),
      onSubmit: (formData: FormData) => {
        const calcName = formData.get('calcName') as string;
        const calcDescription = formData.get('calcDescription') as string;
        const calcFunction = formData.get('calcFunction') as string;
        const calcTip = formData.get('calcTip') as string;
        console.log({ calcName, calcFunction, calcTip });
        const testParams = [1, 2, 1];
        console.log('Testing method with parameters:', testParams)
        const result = eval(`(${calcFunction})(${testParams.join(',')})`);
        if (typeof result !== 'number') {
          throw new Error(`Invalid method - result ${result} (type: ${typeof result}) is not a number type`);
        }
        console.log(`Result: ${result}, accepted`)
        // @todo some kinda validation ?
        addCalculation({
          description: calcDescription,
          fn: calcFunction,
          name: calcName,
          tip: calcTip,
        });
      }
    }
  }), [addCalculation, running, setCalculation]);

  return dialogForms;
}
