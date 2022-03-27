import React from "react";

import { Container, Title, Description, Line, Checker, DetailsButton } from "./styles";

import { ItemProps } from "./types";

export const EachItem: React.FC<ItemProps> = ({ data, onSelectItem }) => {

    return (
        <Container>
            <DetailsButton
                activeOpacity={0.5}
                onPress={() => {
                    if(onSelectItem) onSelectItem(data);
                }}
            >
                <Title finished={data.finished}>
                    {data.title}
                </Title>
                <Line />
                <Description finished={data.finished}>
                    {data.description}
                </Description>

                <Checker checked={data.finished} error={data.hasError} />
            </DetailsButton>
        </Container>
    )
}