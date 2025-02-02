import { forwardRef, PropsWithChildren, useImperativeHandle, useRef, useState } from "react";
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
  const [error, setError] = useState<string | null>('asd')

  const ref = useRef<HTMLDialogElement>(null);
  useImperativeHandle(forwardedRef, () => ref.current as HTMLDialogElement);

  const onSubmitDialog: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formElement = document.forms.namedItem(DIALOG_FORM_NAME)!;
    const formData = new FormData(formElement);
    try {
      onSubmit(formData);
    } catch (e) {
      const error = e as Error;
      console.error(e);
      setError(`${error.name} - ${error.message}`);
      return;
    }
    setError(null);
    ref.current?.close();
  }

  const onCancel = () => {
    onDialogCancel?.();
    ref.current?.close();
  };

  return createPortal(
    <dialog ref={ref} className="m-auto p-6 rounded-lg border-2 border-t-color5 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-md w-fit max-w-[900px]">
      <form id={DIALOG_FORM_NAME} method="dialog" onSubmit={onSubmitDialog}>
        <div className="flex flex-col space-y-2">
          <p className="text-xl text-center">{title}</p>
          <hr />
          {children}
          {error ? (
            <>
              <hr />
              <p className="text-red-700">{error}</p>
            </>
          ) : null}
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