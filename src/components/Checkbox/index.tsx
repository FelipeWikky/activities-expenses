import React, { useEffect, useState } from "react";
import { StyledCheckbox } from "./styles";
import { CheckboxProps } from "./types";
import { Controller } from "react-hook-form";


export const Checkbox: React.FC<CheckboxProps> = ({ children, onPress, control, ...props }) => {
    return (
        <Controller
            name={props.name}
            control={control}
            render={({ field: { value, onChange } }) => (
                <StyledCheckbox
                    {...props as any}
                    checked={!!(value)}
                    onPress={() => onChange(!(value))}
                >
                    {children}
                </StyledCheckbox>
            )}
        />
    );
}