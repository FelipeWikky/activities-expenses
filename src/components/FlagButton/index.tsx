import React from "react";
import CountryPicker, { CountryCode, } from 'react-native-country-picker-modal';

import { Button } from "../Button";
import { Label } from "../Label";

const CountryNameByCode = {
    "BR": "Brasil",
    "US": "United States"
}

type FlagButtonProps = {
    modalVisible?: boolean;
    showCountryName?: boolean;
    onPress?: (countryCode: CountryCode) => void;
    countryCode: CountryCode;
    direction?: "row" | "column"
}
export const FlagButton: React.FC<FlagButtonProps> = ({ countryCode, onPress, showCountryName, direction = "row", modalVisible = false }) => {
    return (
        <Button
            empty
            onPress={() => onPress && onPress(countryCode)}
            style={{ flexDirection: direction && direction === "row" ? "row" : "column", alignItems: "center" }}
        >
            <CountryPicker
                countryCode={countryCode}
                modalProps={{ visible: modalVisible }}
                onOpen={() => onPress  && onPress(countryCode)}
            />
            {!!(showCountryName) && <Label type="NORMAL_SMALL" color="TEXT">{CountryNameByCode[countryCode]}</Label>}
        </Button>
    )
}