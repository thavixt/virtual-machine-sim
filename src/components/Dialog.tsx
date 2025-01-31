import { forwardRef, PropsWithChildren, useCallback, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

type DialogProps = PropsWithChildren<{
  cancel?: React.ReactElement,
  submit?: React.ReactElement,
  title: string;
  onSubmit: (payload: FormData) => void | Promise<void>,
  onCancel?: () => void | Promise<void>,
}>

const DIALOG_FORM_NAME = 'dialogForm'

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>((props, forwardedRef) => {
  const { cancel, onSubmit, submit, onCancel: onDialogCancel, children, title } = props;

  const ref = useRef<HTMLDialogElement>(null);
  useImperativeHandle(forwardedRef, () => ref.current as HTMLDialogElement);

  const onSubmitDialog: React.FormEventHandler<HTMLFormElement> = () => {
    const formElement = document.forms.namedItem(DIALOG_FORM_NAME)!;
    const formData = new FormData(formElement);
    onSubmit(formData);
  }

  const onCancel = useCallback(() => {
    onDialogCancel?.();
    ref.current?.close();
  }, [onDialogCancel]);

  return createPortal(
    <dialog ref={ref} className="p-6 rounded-lg border-2 border-t-color5 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-md w-[700px]">
      <form id={DIALOG_FORM_NAME} method="dialog" onSubmit={onSubmitDialog}>
        <div className="flex flex-col space-y-4">
          <p className="text-xl text-center">{title}</p>
          <hr />
          {children}
          <hr />
          <div className="flex space-x-2 justify-end">
            <button type="button" onClick={() => onCancel()}>{cancel ?? 'Cancel'}</button>
            <button type="submit">{submit ?? 'Apply'}</button>
          </div>
        </div>
      </form>
    </dialog >,
    document.body,
  );
})