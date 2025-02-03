import { useVirtualStore, VirtualAction } from "../state";
import { CreateDialog, SelectDialog } from "../components/Dialogs";
import { useMemo } from "react";
import { Calculation } from "../types";
import { CreateTapeDialog } from "../components/Dialogs/CreateTapeDialog";
import { getRandomTape } from "./utils";

export type DialogType = 'create' | 'select' | 'createTape';
export type Dialogs = Record<DialogType, DialogEntry>;
export interface DialogEntry {
  form: React.ReactElement;
  title: string;
  onSubmit: (formData: FormData) => void | Promise<void>;
}

/**
 * @todo maybe this dialog list should just be a basic list of components instead of a hook, hm
 */
export function useDialogForms() {
  const addCalculation = useVirtualStore(state => state.addCalculation);
  const setCalculation = useVirtualStore(state => state.setCalculation);
  const setTape = useVirtualStore(state => state.setTape);

  const dialogForms: Dialogs = useMemo(() => ({
    select: {
      title: 'Set the function the Virtual machine applies:',
      form: <SelectDialog />,
      onSubmit: (formData: FormData) => {
        const calcName = formData.get('calcName') as Calculation;
        setCalculation(calcName);
      },
    },

    create: {
      title: 'Create a method for the Virtual machine to apply every step',
      form: <CreateDialog />,
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
    },
    
    createTape: {
      title: 'Generate a random tape',
      form: <CreateTapeDialog />,
      onSubmit: (formData: FormData) => {
        const tapeLength = formData.get('tapeLength') as string;
        const tapeMin = formData.get('tapeMin') as string;
        const tapeMax = formData.get('tapeMax') as string;
        const tape = getRandomTape(+tapeLength, +tapeMin, +tapeMax);
        console.log(tape);
        setTape(tape);
      },
    },
  }), [addCalculation, setCalculation, setTape]);

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