import React from "react";
import { StyledCheckbox } from "./styles";
import { CheckboxProps } from "./types";
import { Controller } from "react-hook-form";

//TODO: entender o erro quando passa as props pro styled que eu preciso inserir any senao da erro
export const Checkbox: React.FC<CheckboxProps> = (props) => {
    const {children, name, control} = props;
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => (
                <StyledCheckbox
                    {...props as any}
                    editable={false}
                    value={value ? "true" : "false"}
                    onPressIn={() => onChange(!value)}
                >
                    {children}
                </StyledCheckbox>
            )}
        />
    );
}