import { FontAwesome5 } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { formatDateTime } from "../../../utils/format";
import { Line } from "../../../layout/Line";

import { Container, Title, Description, Checker, SwipableButton, DetailsButton, RemoveButton, CreatedAt } from "./styles";

import { ItemProps } from "./types";
import { useRef } from "react";

export const EachItem: React.FC<ItemProps> = ({ data, onSelectItem, onRemoveItem }) => {
    const ref = useRef<Swipeable>(null);
    return (
        <Container>
            <SwipableButton
                rightThreshold={60}
                ref={ref}
                renderRightActions={(_) => (
                    <RemoveButton onPress={() => {
                        if (onRemoveItem && data) onRemoveItem(data);
                        ref?.current?.close();
                    }}>
                        <FontAwesome5 name="trash" size={20} color="white" />
                    </RemoveButton>
                )}
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