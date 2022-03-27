import React from "react";
import { StyledBox } from "./styles";
import { BoxProps } from "./types";

export const Box: React.FC<BoxProps> = ({ children, ...props}) => {
    return (
        <StyledBox {...props}>
            {children}
        </StyledBox>
    );
}