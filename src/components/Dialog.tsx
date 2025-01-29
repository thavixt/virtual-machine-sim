import { forwardRef, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

type DialogProps = PropsWithChildren<{
  cancel?: React.ReactElement,
  submit?: React.ReactElement,
  title: string;
  onSubmit: (payload: FormData) => void | Promise<void>,
  onCancel: () => void | Promise<void>,
}>

const DIALOG_FORM_NAME = 'dialogForm'

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>((props, ref) => {
  const { cancel, onSubmit, submit, onCancel, children, title } = props;

  const onSubmitDialog: React.FormEventHandler<HTMLFormElement> = () => {
    const formElement = document.forms.namedItem(DIALOG_FORM_NAME)!;
    const formData = new FormData(formElement);
    onSubmit(formData);
  }

  return createPortal(
    <dialog ref={ref} id="dialog" className="p-2 rounded-lg border-2 border-t-color5 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-md">
      <form id={DIALOG_FORM_NAME} method="dialog" onSubmit={onSubmitDialog}>
        <div className="flex flex-col space-y-4">
          <p className="text-xl text-center">{title}</p>
          {children}
          <div className="flex space-x-2 justify-end">
            <button type="button" onClick={() => onCancel()}>{cancel ?? 'Cancel'}</button>
            <button type="submit">{submit ?? 'Submit'}</button>
          </div>
        </div>
      </form>
    </dialog >,
    document.body,
  );
})