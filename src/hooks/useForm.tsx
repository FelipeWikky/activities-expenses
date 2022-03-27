import { useCallback, useEffect, useState } from "react";
import { ObjectSchema, ValidationError } from "yup";

export function useForm<T>(initialData?: T, validationSchema?: ObjectSchema<any>) {
    const [formData, setFormData] = useState<T>(initialData);
    const [formErrors, setFormErrors] = useState<ValidationError[]>([]);
    const [triedSubmit, setTriedSubmit] = useState(false);

    const onChangeFormData = useCallback((attribute: keyof T | "*", value: string | number | boolean | Date | T, changeAll?: boolean) => {
        if (changeAll) {
            setFormData(value as T);
        } else {
            setFormData(prev => ({ ...prev, [attribute]: value }));
        }
    }, [formData, validationSchema]);

    const clearFormData = useCallback(() => {
        setFormErrors([]);
        setFormData({} as T);
    }, []);

    useEffect(() => {
        if (triedSubmit) {
            (function validate() {
                try {
                    validationSchema?.validateSync(
                        formData,
                        { abortEarly: false }
                    );
                } catch (error) {
                    if (error instanceof ValidationError) {
                        setFormErrors(error?.inner);
                    }
                }
            })();
        }
    }, [formData, triedSubmit]);

    const onSubmitFormData = useCallback((callbackFunction?: (data?: T) => void) => {
        setTriedSubmit(true);
        (function validate() {
            try {
                validationSchema?.validateSync(
                    formData,
                    { abortEarly: false }
                );
                setFormErrors([]);
                if (callbackFunction) {
                    callbackFunction(formData);
                }
            } catch (error) {
                if (error instanceof ValidationError) {
                    setFormErrors(error?.inner);
                }
            }
        })();
    }, [formData, validationSchema]);

    const getErrorByField = useCallback(
        (field: keyof T) => formErrors?.find(error => error.path === field)?.message,
        [formErrors]
    )

    return {
        formData, onChangeFormData,
        formErrors, getErrorByField,
        clearFormData, onSubmitFormData
    };
}