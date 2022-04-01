import { Controller, Control } from "react-hook-form";
import { View } from "react-native";

import { useMemo, useState } from "react";
import { formatDate, formatTime } from "../../utils/format";

import { DateTimeBox, DateTimePicker, DateTimeButton, DateTimeLabel } from "./styles";


type DatePickerProps = {
    type: "date" | "time" | "datetime";
    control: Control<any>;
    name: string;
    label?: string;
    editable?: boolean;
    viewValue?: string | Date;
}

export const DatePicker: React.FC<DatePickerProps> = ({ label, name, control, type, editable, viewValue }) => {

    const [mode, setMode] = useState<undefined | "date" | "time">(undefined);

    const showDate = useMemo(() => type === "date" || type === "datetime", [type]);
    const showTime = useMemo(() => type === "time" || type === "datetime", [type]);

    return (
        <View>
            <DateTimeLabel color="LABEL" strong>
                {label}
            </DateTimeLabel>
            <Controller
                name={name}
                control={control}
                render={({ field: { value, onChange } }) => (
                    <>
                        <DateTimePicker
                            mode={mode}
                            onConfirm={date => {
                                onChange(date);
                                setMode(undefined);
                            }}
                            onCancel={() => setMode(undefined)}
                            date={viewValue ? new Date(viewValue) : value ? new Date(value) : new Date()}
                        />
                        <DateTimeBox >
                            {showDate && (
                                <DateTimeButton onPress={() => setMode("date")} disabled={!editable} >
                                    <DateTimeLabel>
                                        {formatDate(value) || "dd/mm/yyyy"}
                                    </DateTimeLabel>
                                </DateTimeButton>
                            )}
                            {showTime && (
                                <DateTimeButton onPress={() => setMode("time")} disabled={!editable} >
                                    <DateTimeLabel>
                                        {formatTime(value) || "hh:mm"}
                                    </DateTimeLabel>
                                </DateTimeButton>
                            )}
                        </DateTimeBox>
                    </>
                )}
            />
        </View>
    );
}