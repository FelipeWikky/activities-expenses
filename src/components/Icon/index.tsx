import React from "react";
import {
    Ionicons,
    FontAwesome,
    FontAwesome5,
    AntDesign,
    Entypo,
    MaterialIcons,
    Feather
} from '@expo/vector-icons';
import { IconGroup, IconProps } from "./types";
import { THEME } from "../../theme";

const getIconComponentByProps = (
    group: keyof typeof IconGroup,
    name: any,
    color: string,
    size: number,
    style?: any
) => {
    switch (group) {
        case "AntDesign":
            return <AntDesign name={name} color={color} size={size} style={style} />;
        case "Entypo":
            return <Entypo name={name} color={color} size={size} style={style} />;
        case "FontAwesome":
            return <FontAwesome name={name} color={color} size={size} style={style} />;
        case "FontAwesome5":
            return <FontAwesome5 name={name} color={color} size={size} style={style} />;
        case "Ionicons":
            return <Ionicons name={name} color={color} size={size} style={style} />;
        case "MaterialIcons":
            return <MaterialIcons name={name} color={color} size={size} style={style} />;
        case "Feather":
            return <Feather name={name} color={color} size={size} style={style} />;

    }
}

export const Icon: React.FC<IconProps> = ({ group, name, color = THEME.COLORS.INPUT_ICON, size = 24, style }) => {
    return getIconComponentByProps(group, name, color, size, style);
}