import React from "react";
import { StyledChecker, CheckerLabel, CheckerContainer } from "./styles";
import { CheckerProps } from "./types";

export const Checker: React.FC<CheckerProps> = ({ children, onPress, label, labelProps, ...props }) => {
    return (
        <CheckerContainer onPress={onPress} {...props}>
            <CheckerLabel {...labelProps as any}>
                {label}
            </CheckerLabel>
            <StyledChecker {...props} />
        </CheckerContainer>
    )
}