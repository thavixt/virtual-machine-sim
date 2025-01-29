import { useMemo } from "react";
import { useTuringStore } from "../state/store";
import { Calculation, CALCULATIONS } from "./calculations";

export type DialogType = 'set' | 'add';
export interface DialogEntry {
  form: JSX.Element;
  title: string;
  onSubmit: (formData: FormData) => void | Promise<void>;
}
export type Dialogs = Record<DialogType, DialogEntry>;

export function useDialogForms() {
  const running = useTuringStore(state => state.running);
  const setCalculation = useTuringStore(state => state.setCalculation);

  const dialogForms: Dialogs = useMemo(() => ({
    set: {
      title: 'Set the function the Turing machine applies:',
      form: (
        <div className="flex space-x-4">
          <label htmlFor="calcName">Select a method:</label>
          <select name="calcName" id="calcName">
            <option value="">-- Choose an option --</option>
            {Object.entries(CALCULATIONS).map(([key, value]) => (
              <option disabled={running} key={key} value={key} title={value.description}>{value.name}</option>
            ))}
          </select>
        </div>
      ),
      onSubmit: (formData) => {
        const calcName = formData.get('calcName') as Calculation;
        setCalculation(calcName);
      },
    },
    add: {
      title: 'Create a method for the Turing machine',
      form: (
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-2">
            <label htmlFor="calcName">Name:</label>
            <input className="w-full" type="text" name="calcName" id="calcName" />
          </div>
          <div className="flex space-x-2">
            <label htmlFor="calcFunction">Function:</label>
            <input className="w-full" type="text" name="calcFunction" id="calcFunction" />
          </div>
          <div className="flex flex-col space-y-2 text-gray-400">
            <span>Example:</span>
            <pre>
              <code>
                (input1, input2) ={'>'} input1 + input2
              </code>
            </pre>
            <div>
              <p>The example is for the <code>add</code> method.</p>
              <p>It receives the current value. and the next input from the tape, and returns their sum.</p>
            </div>
          </div>
        </div >
      ),
      onSubmit: (formData) => {
        // @todo store methods
        const calcName = formData.get('calcName') as Calculation;
        const calcFunction = formData.get('calcFunction') as Calculation;
        console.log({calcName, calcFunction});
        // addCalculation(calcName);
        // @todo some kinda validation ?
      }
    }
  }), [running, setCalculation]);

  return dialogForms;
}