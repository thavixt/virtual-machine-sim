import { useRef, useState } from "react";
import { Dialog } from "./Dialog";
import { DialogType, useDialogForms } from "../logic/useDialogForm";
import { useVirtualStore } from "../state";

export function DashboardButtons() {
  const [activeDialog, setActiveDialog] = useState<DialogType>('set');
  const dialogForms = useDialogForms();

  const calculation = useVirtualStore(state => state.calculation);
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

            <div className="grid grid-rows-1 grid-cols-2 items-center">
              <p>Current method:</p>
              <button
                className="w-full"
                onClick={() => openDialog('set')}
                title="Change method"
                type="button"
                disabled={running}
              >
                {calculation.toString()}
              </button>
            </div>
            {/* <button
              disabled={running}
              onClick={() => openDialog('set')}
              type="button"
            >
              Update current method
            </button> */}
            <button
              className="inverse"
              disabled={running}
              onClick={() => openDialog('create')}
              type="button"
            >
              Create a new method
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
