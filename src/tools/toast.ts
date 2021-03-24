import { toast, TypeOptions } from "react-toastify";

export enum ToastTypes {
  DEFAULT,
  INFO,
  WARNING,
  ERROR,
  SUCCESS,
}

export const showErrorToast = (error: string) => {
  const type: TypeOptions = ToastTypes[
    ToastTypes.ERROR
  ].toLowerCase() as TypeOptions;
  toast(error, {
    type,
    autoClose: 5000, // set false to disable auto close
  });
};
