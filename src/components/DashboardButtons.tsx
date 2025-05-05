import { useRef, useState } from "react";
import { Dialog } from "./Dialog";
import { DialogType, useDialogForms } from "../logic/useDialogForm";
import { useVirtualStore } from "../state";
import { CalculationFn } from "../types";

export function DashboardButtons() {
  const [activeDialog, setActiveDialog] = useState<DialogType>('select');
  const dialogForms = useDialogForms();

  const calculation = useVirtualStore(state => state.calculation);
  const calculations = useVirtualStore(state => state.calculations);
  const calculationObject: CalculationFn = calculations[calculation];
  const running = useVirtualStore(state => state.isRunning);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = (type: DialogType | null) => {
    if (!type) {
      dialogRef.current?.close();
      return;
    }
    setActiveDialog(type);
    dialogRef.current?.showModal();
  };

  return (
    <>
      {/* dialog is rendered through a portal to the root */}
      <Dialog
        title={dialogForms[activeDialog].title}
        onSubmit={dialogForms[activeDialog].onSubmit}
        ref={dialogRef}
      >
        <div className="flex flex-col">
          {dialogForms[activeDialog].form}
        </div>
      </Dialog>
      <div className="flex flex-col min-h-0 h-full">
        <div className="overflow-y-auto h-full space-x-2">
          <div className="flex flex-col space-y-2">

            <div className="grid grid-rows-1 grid-cols-10 text-center">
              <div className="flex flex-col items-start col-span-4">
                <span>Current method:</span>
              </div>
              <div className="flex flex-col space-y-1 col-span-6">
                <button
                  className="w-full text-sm"
                  onClick={() => openDialog('select')}
                  title="Change method"
                  type="button"
                  disabled={running}
                >
                  {calculationObject.name}
                </button>
                <small>(click to change)</small>
              </div>
            </div>
            <button
              className="inverse"
              disabled={running}
              onClick={() => openDialog('create')}
              type="button"
            >
              Create a new method
            </button>
            <button
              className="inverse"
              disabled={running}
              onClick={() => openDialog('createTape')}
              type="button"
            >
              Generate a random tape
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
