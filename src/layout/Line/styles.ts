import styled from "styled-components/native";

import Animated from "react-native-reanimated";

import { THEME } from "../../theme";
import { LineProps } from "./types";

export const StyledLine = styled(Animated.View)<LineProps>`
    height:${({height}) => height ? typeof(height) === "number" ? height + 'px' : height :  "1px"};
    width:${({width}) => width ? typeof(width) === "number" ? width + 'px' : width :  "100%"};
    background-color: ${({color, shadow}) => shadow ? THEME.SHADOW[shadow] : color || THEME.SHADOW[1]};
    align-self: center;

    margin-top:${({marginVertical}) => marginVertical ? typeof(marginVertical) === "number" ? marginVertical + 'px' : marginVertical :  "0px"};
    margin-bottom:${({marginVertical}) => marginVertical ? typeof(marginVertical) === "number" ? marginVertical + 'px' : marginVertical :  "0px"};
    margin-left:${({marginVertical}) => marginVertical ? typeof(marginVertical) === "number" ? marginVertical + 'px' : marginVertical :  "0px"};
    margin-right:${({marginHorizontal}) => marginHorizontal ? typeof(marginHorizontal) === "number" ? marginHorizontal + 'px' : marginHorizontal :  "0px"};
`;