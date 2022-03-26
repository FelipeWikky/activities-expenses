import React from "react";

import { StyledLabel } from "./styles";
import { LabelProps } from "./types";


export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
    return (
        <StyledLabel {...props as any}>
            {children}
        </StyledLabel>
    );
}