import { toast, TypeOptions } from "react-toastify";

enum ToastTypes {
    DEFAULT,
    INFO,
    WARNING,
    ERROR,
    SUCCESS
}

export function showErrorToast(error: string) {
    const type: TypeOptions = ToastTypes[ToastTypes.ERROR].toLowerCase() as TypeOptions;
    toast(error, { 
        type: type, 
        autoClose: 5000 //set false to disable auto close
    });
}