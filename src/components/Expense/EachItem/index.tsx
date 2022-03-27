import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { formatDateTime } from "../../../utils/format";
import { Line } from "../../../layout/Line";

import {
    Container, Title, Description, CreatedAt, Checker,
    SwipableButton, DetailsButton, FinishButton, RemoveButton,
} from "./styles";

import { ItemProps } from "./types";
import { useMemo, useRef } from "react";

export const EachItem: React.FC<ItemProps> = ({ data, onSelectItem, onRemoveItem }) => {
    const ref = useRef<Swipeable>(null);

    const LeftActions = useMemo(() => {
        const buttons: JSX.Element[] = [];
        if (!data.hasError) {
            buttons.push(
                <RemoveButton key={`error-${data.id}`} onPress={() => {
                    ref?.current?.close();
                }}>
                    <MaterialIcons name="error" size={18} color="white" />
                </RemoveButton>
            )
        }
        if (!data.finished) {
            buttons.push(
                <FinishButton key={`finish-${data.id}`} onPress={() => {
                    ref?.current?.close();
                }}>
                    <AntDesign name="checkcircle" size={18} color="white" />
                </FinishButton>
            );
        }
        if (buttons.length > 0) {
            return (
                <>
                    {buttons.map(button => button)}
                </>
            );
        }
        return null;
    }, [data, ref]);

    const RightIcons = useMemo(() => {
        return (
            <RemoveButton onPress={() => {
                if (onRemoveItem && data) onRemoveItem(data);
                ref?.current?.close();
            }}>
                <FontAwesome5 name="trash" size={18} color="white" />
            </RemoveButton>
        );
    }, [data, ref]);

    return (
        <Container>
            <SwipableButton
                rightThreshold={60}
                leftThreshold={60}
                ref={ref}
                renderRightActions={(_) => RightIcons}
                renderLeftActions={(_) => LeftActions}
            >
                <DetailsButton
                    activeOpacity={0.5}
                    onPress={() => {
                        if (onSelectItem) onSelectItem(data);
                    }}
                >
                    <Title finished={data.finished}>
                        {data.title}
                    </Title>
                    <Line shadow={2} />
                    <Description finished={data.finished}>
                        {data.description}
                    </Description>

                    <CreatedAt>
                        {formatDateTime(data?.createdAt)}
                    </CreatedAt>

                    <Checker checked={data.finished} error={data.hasError} />
                </DetailsButton>
            </SwipableButton>
        </Container>
    )
}