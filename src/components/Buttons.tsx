import { useCallback, useRef, useState } from "react";
import { useTuringStore } from "../state/store";
import { Dialog } from "./Dialog";
import { DialogType, useDialogForms } from "../logic/useDialogForm";

export function Buttons() {
  const calculation = useTuringStore(state => state.calculation);
  const [activeDialog, setActiveDialog] = useState<DialogType>('set');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogForms = useDialogForms();

  const openDialog = useCallback((type: DialogType | null) => {
    if (!type) {
      dialogRef.current?.close();
      return;
    }
    setActiveDialog(type);
    dialogRef.current?.showModal();
  }, []);

  const onCancel = useCallback(() => {
    openDialog(null);
  }, [openDialog]);

  return (
    <div className="flex flex-col min-h-0 h-full w-1/2">
      <div className="overflow-y-auto h-full p-2">
        <div className="flex flex-col space-y-2">

          <div className="flex space-x-2 items-center">
            <p>Current method:</p>
            <button
              className="w-32"
              type="button"
              onClick={() => openDialog('set')}
              title="Change method"
            >
              {calculation.toString()}
            </button>
          </div>
          <button
            type="button"
            onClick={() => openDialog('set')}
          >
            Change current method
          </button>
          {/* @TODO: Add method*/}
          <button
            type="button"
            onClick={() => openDialog('add')}
          >
            Create method
          </button>

        </div>
      </div>
      <Dialog
        title={dialogForms[activeDialog].title}
        onCancel={onCancel}
        onSubmit={dialogForms[activeDialog].onSubmit}
        ref={dialogRef}
      >
        <div className="flex flex-col">
          {dialogForms[activeDialog].form}
        </div>
      </Dialog>
    </div>
  )
}