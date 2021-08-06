import { toast, TypeOptions } from "react-toastify";

export enum ToastTypes {
  DEFAULT,
  INFO,
  WARNING,
  ERROR,
  SUCCESS,
}

const showToast = (msg: string, type: ToastTypes) => {
  const localType: TypeOptions = ToastTypes[type].toLowerCase() as TypeOptions;
  toast(msg, {
    autoClose: 5000, // set false to disable auto close
    type: localType,
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};

export const showErrorToast = (msg: string) => {
  showToast(msg, ToastTypes.ERROR);
};

export const showWarningToast = (msg: string) => {
  showToast(msg, ToastTypes.WARNING);
};

export const showSuccessToast = (msg: string) => {
  showToast(msg, ToastTypes.SUCCESS);
};
