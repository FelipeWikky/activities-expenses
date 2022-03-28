import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { formatDateTime } from "../../../utils/format";

import {
    Container, Title, Description, CreatedAt, Checker,
    SwipableButton, DetailsButton, FinishButton, RemoveButton,
} from "./styles";

import { ItemProps } from "./types";
import { useCallback, useMemo, useRef } from "react";
import { Box } from '../../../layout/Box';

export const EachItem: React.FC<ItemProps> = ({ data, actions }) => {
    const ref = useRef<Swipeable>(null);

    const LeftActions = useMemo(() => {
        const buttons: JSX.Element[] = [];
        if (!data.hasError) {
            buttons.push(
                <RemoveButton key={`error-${data.id}`}
                    onPress={() => {
                        actions?.onAddError(data);
                        ref?.current?.close();
                    }}
                >
                    <MaterialIcons name="error" size={18} color="white" />
                </RemoveButton>
            )
        }
        if (!data.finished) {
            buttons.push(
                <FinishButton key={`finish-${data.id}`}
                    onPress={() => {
                        actions?.onFinish(data)
                        ref?.current?.close();
                    }}
                >
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
                actions?.onRemove(data);
                ref?.current?.close();
            }}>
                <FontAwesome5 name="trash" size={18} color="white" />
            </RemoveButton>
        );
    }, [data, ref]);

    const renderUpdatedAt = useCallback(() => {
        if (!data) return '';
        if (!data.createdAt || !data.updatedAt) return '';
        if (data?.createdAt === data?.updatedAt) return '';
        if (data?.createdAt !== data?.updatedAt) return formatDateTime(data?.updatedAt);
        return '';
    }, [data]);

    const renderCreatedAt = useCallback(() => {
        if (!data) return '';
        if (!data.createdAt || !data.updatedAt) return '';
        if (data?.createdAt === data?.updatedAt) return formatDateTime(data?.createdAt);
        if (data?.createdAt !== data?.updatedAt) return '';
        return '';
    }, [data]);

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
                        if (actions?.onSelect) actions.onSelect(data);
                    }}
                >
                    <Title finished={data.finished}>
                        #{data?.id} - {data.title}
                    </Title>

                    <Description finished={data.finished}>
                        {data.description}
                    </Description>

                    <Box direction='row' justifyContent='space-between'>
                        <CreatedAt>
                            Quando? {formatDateTime(data?.when)}
                        </CreatedAt>
                        <CreatedAt>
                            {renderUpdatedAt() ? "Atualizado em " + renderUpdatedAt() : "Criado em " + renderCreatedAt()}
                        </CreatedAt>
                    </Box>

                    <Checker checked={data.finished} error={data.hasError} />
                </DetailsButton>
            </SwipableButton>
        </Container>
    )
}