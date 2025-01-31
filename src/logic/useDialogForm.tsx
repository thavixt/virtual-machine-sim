import { Calculation, CALCULATIONS } from "./calculations";
import { useTuringStore } from "../state";
import { FormInput } from "../components/Input";
import { useMemo } from "react";
import { ListItem } from "../components/ListItem";

export type DialogType = 'set' | 'create';
export interface DialogEntry {
  form: JSX.Element;
  title: string;
  onSubmit: (formData: FormData) => void | Promise<void>;
}
export type Dialogs = Record<DialogType, DialogEntry>;

/**
 * @todo maybe this dialog list should just be a basic list of components instead of a hook, hm
 */
export function useDialogForms() {
  const running = useTuringStore(state => state.isRunning);
  const setCalculation = useTuringStore(state => state.setCalculation);

  const dialogForms: Dialogs = useMemo(() => ({
    set: {
      title: 'Set the function the Turing machine applies:',
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
      title: 'Create a method for the Turing machine to apply every step',
      form: (
        <div className="flex flex-col space-y-4">
          <FormInput name="calcName" label="Function name" />
          <FormInput name="calcFunction" label="Code (Javascript)" type="textarea" info={`WIP\nasd`} className="font-mono" />
          <FormInput name="calcTip" label="Tip" />
          <div className="flex flex-col space-y-2 text-gray-400">
            <span>Example:</span>
            <pre>
              <code>
                (step, prev, input1) ={'>'} prev + input1
              </code>
            </pre>
            <div>
              <p>The example is for the <code>add</code> method.</p>
              <p>It receives the index of the current <b>step</b>, the <b>previous</b> result and the next <b>input</b> from the tape, and returns their sum.</p>
            </div>
            <hr />
            <p>Methods usable:</p>
            <div className="max-h-64 overflow-y-auto">
              <ul className="list-disc list-inside">
                <ListItem title="back(n: number)">set the tape backwards <code>n</code> steps</ListItem>
                <ListItem title="forward(n: number)">set the tape forwards <code>n</code> steps</ListItem>
                {/* @todo */}
                <ListItem title="TODO">other useful or interesting utils...</ListItem>
                {new Array(20).fill(0).map((_, i) => (
                  <ListItem key={i} title="TODO">TODO (actually do the above fns)</ListItem>
                ))}
              </ul>
            </div>
          </div>
        </div >
      ),
      onSubmit: (formData: FormData) => {
        // @todo store methods
        const calcName = formData.get('calcName') as Calculation;
        const calcFunction = formData.get('calcFunction') as Calculation;
        console.log({ calcName, calcFunction });
        // addCalculation(calcName);
        // @todo some kinda validation ?
      }
    }
  }), [running, setCalculation]);

  return dialogForms;
}