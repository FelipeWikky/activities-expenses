import { useCallback, useState } from "react";

export function useForm<T>(initialData?: T) {
    const [data, setData] = useState<T>(initialData);

    const onChangeData = useCallback((attribute: keyof T | "*", value: string | number | boolean | Date | T, changeAll?: boolean) => {
        if (changeAll) {
            setData(value as T);
        } else {
            setData(prev => ({ ...prev, [attribute]: value }));
        }
    }, []);

    return {
        data, onChangeData
    };
}