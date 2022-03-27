import React from "react";

import { StyledLine } from "./styles";
import { LineProps } from "./types";

export const Line: React.FC<LineProps> = ({children, ...props}) => {
    return (
        <StyledLine {...props}>
            {children}
        </StyledLine>
    );
}