import React, { useEffect, useState } from "react";
import { StyledCheckbox } from "./styles";
import { CheckboxProps } from "./types";


export const Checkbox: React.FC<CheckboxProps> = ({ children, onPress, ...props }) => {
    const [localChecked, setLocalChecked] = useState(props.checked);
    useEffect(() => {
        setLocalChecked(props.checked)
    }, [props.checked]);
    return (
        <StyledCheckbox
            {...props as any}
            onPress={() => {
                if (onPress) onPress(props.name, localChecked)
            }}
        >
            {children}
        </StyledCheckbox>
    );
}