import { CALCULATIONS } from "./calculations";
import { useVirtualStore, VirtualAction } from "../state";
import { FormInput } from "../components/Input";
import { useMemo } from "react";
import { ListItem } from "../components/ListItem";
import { Calculation } from "../types";
import { CodeEditor } from "../components/CodeEditor";

export type DialogType = 'set' | 'create';

export interface DialogEntry {
  form: React.ReactElement;
  title: string;
  onSubmit: (formData: FormData) => void | Promise<void>;
}

export type Dialogs = Record<DialogType, DialogEntry>;

const PLACEHOLDER_NAME = `My custom function`;
const PLACEHOLDER_DESCRIPTION = `This method does x and y, and halts when z occurs`;
const PLACEHOLDER_FUNCTION_CODE = CALCULATIONS.even.fn.toString();
const PLACEHOLDER_TIP = `Optional: Describe a useful thing you can do with this`;

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
        <div className="w-full flex space-x-4 items-center">
          <label htmlFor="calcName">Method:</label>
          <select className="w-full h-8" name="calcName" id="calcName">
            {Object.entries(CALCULATIONS)
              .sort(([aKey], [bKey]) => aKey.localeCompare(bKey))
              .map(([key, value]) => {
                let tooltip = value.description
                if (value.tip) {
                  tooltip += `\n\nTip:\n${value.tip}`;
                }
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
          <FormInput
            label="Function name"
            name="calcName"
            placeholderValue={PLACEHOLDER_NAME}
          />
          <FormInput
            label="Description"
            name="calcDescription"
            placeholderValue={PLACEHOLDER_DESCRIPTION}
          />
          <CodeEditor
            defaultValue={PLACEHOLDER_FUNCTION_CODE}
            name="calcFunction"
          />
          <FormInput
            label="Tip"
            name="calcTip"
            placeholderValue={PLACEHOLDER_TIP}
          />
          <div className="flex flex-col space-y-2 text-gray-400 text-sm">
            <div className="h-fit max-h-32 overflow-y-auto">
              <p>Methods available:</p>
              <ul className="list-disc list-inside">
                <ListItem title="$vm_back(n: number)">advance the tape backwards <code>n</code> steps</ListItem>
                <ListItem title="$vm_forward(n: number)">advance the tape forwards <code>n</code> steps</ListItem>
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
      ),
      onSubmit: (formData: FormData) => {
        const calcName = formData.get('calcName') as string;
        const calcDescription = formData.get('calcDescription') as string;
        const calcFunction = formData.get('calcFunction') as string;
        const calcTip = formData.get('calcTip') as string;
        console.log({ calcName, calcFunction, calcTip });
        const testParams = [1, 2, 1];
        console.log('Testing method with parameters:', testParams)
        const builtInMethods = getAllUtilityMethods();
        console.log(builtInMethods);
        const result = eval(`${builtInMethods}(${calcFunction})(${testParams.join(',')})`);
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

function getAllUtilityMethods(): string {
  const methods: string[] = [];

  Object.keys(VirtualAction).forEach((key) => {
    const methodDeclaration = `const $${key} = window.$vm_${key};`;
    console.log('Method', `$${key} / global:$vm_${key}`, methodDeclaration);
    methods.push(methodDeclaration)
  });

  return methods.join('\n');
}