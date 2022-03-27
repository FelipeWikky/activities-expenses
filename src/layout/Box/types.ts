import React from "react";
import { ViewProps } from "react-native";
import Animated from "react-native-reanimated";

export type BoxProps = ViewProps & {
    direction?: "row" | "column";
    alignItems?: "flex-start" | "flex-end" | "center";
    justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
}