import Animated from "react-native-reanimated";
import styled from "styled-components/native";
import { BoxProps } from "./types";

export const StyledBox = styled(Animated.View) <BoxProps>`
    flex-direction: ${({ direction }) => direction && direction === "row" ? "row" : "column"};
    align-items: ${({ alignItems }) => !!(alignItems)? alignItems : "flex-start"};
    justify-content: ${({ justifyContent }) => !!(justifyContent)? justifyContent : "flex-start"};
`;