import { IToastService, IToastProps } from "native-base/lib/typescript/components/composites/Toast";
import { useToast as useToastNB } from "native-base";

export enum TOAST_ID {
    DEFAULT = "DEFAULT",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    WARNING = "WARNING",
}

export const useToast = () => {
    const toast = useToastNB();

    const show = (title: string, status: "info" | "warning" | "success" | "error", id?: keyof TOAST_ID) => {
        toast.show({
            title,
            status,
            id: id || "DEFAULT"
        })
    }

    return {
        show
    }
}