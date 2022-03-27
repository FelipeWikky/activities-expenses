import React from "react";
import { Controller } from "react-hook-form";
import { TouchableOpacity } from "react-native";

import { StyledCheckbox, StyledCheckboxIcon, StyledCheckIcon } from "./styles";

import { CheckboxProps } from "./types";

//TODO: entender o erro quando passa as props pro styled que eu preciso inserir any senao da erro
export const Checkbox: React.FC<CheckboxProps> = (props) => {
    const { icon, name, control } = props;

    const showIcon = !!(icon);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange, name } }) => {
                console.log('to name ', name, ' value ', value)
                return (
                    <TouchableOpacity onPress={() => onChange(!value)}>
                        {showIcon
                            ? (
                                <StyledCheckboxIcon
                                    {...props as any}
                                    value={value}
                                >
                                    {!!(value) && <StyledCheckIcon color={icon.color} />}
                                </StyledCheckboxIcon>
                            )
                            : (
                                <StyledCheckbox
                                    {...props as any}
                                    editable={false}
                                    value={value ? "true" : "false"}
                                    onPressIn={() => onChange(!value)}
                                />
                            )}
                    </TouchableOpacity>
                )
            }}
        />
    );
}