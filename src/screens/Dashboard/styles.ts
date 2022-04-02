import { Animated } from "react-native";
import styled from "styled-components/native";
import { Button } from "../../components/Button";
import { Label } from "../../components/Label";
import { Box } from "../../layout/Box";
import { THEME } from "../../theme";

export const Container = styled.SafeAreaView`
    flex: 1;
`;

export const Content = styled.View`
    align-items: center;
    width: 100%;
`;

export const Header = styled.View`
    flex-direction: row;
    align-items: flex-end;
`;

export const GrapContainer = styled(Animated.View)`
    height: 100%;
    width: 95%;
    align-items: flex-start;
    border: 1px solid ${({ theme }) => theme.SHADOW[1]};
    border-radius: 5px;
`;

type Graph = {
    percentage: number;
    color: keyof typeof THEME.COLORS;
}

export const GraphBar = styled(Animated.View) <Graph>`
    height: 24px;
    width: ${({ percentage }) => !!(percentage) ? (percentage) + "%" : "100%"};
    background-color: ${({ theme, percentage, color }) => !!(percentage) ? theme.COLORS[color] : "transparent"};
    border: 0.5px solid ${({ theme, color }) => theme.COLORS[color]};
    border-left-width: 0;
    border-right-width: 0;
`;

export const GraphTitle = styled(Label).attrs(props => ({
    type: "NORMAL_SMALL"
}))`
    margin: 24px 4px 4px 4px;
`;

export const GraphButton = styled(Button).attrs(props => ({
    empty: true
}))`
    width: 100%;
    align-items: flex-start;
`;

export const PreviewContainer = styled.View`
    flex: 1;
    height: 100%;
    background-color: ${({ theme }) => theme.SHADOW[2]};
    align-items: center;
    justify-content: center;
`;

export const PreviewContent = styled.View`
    align-items: flex-start;
    background-color: ${({ theme }) => theme.COLORS.COLOR_300};
    height: 80%;
    width: 95%;
    border-radius: 15px;
    padding: 8px 16px;
`;

export const PreviewCloseContainer = styled(Box).attrs(props => ({
    alignItems: "flex-end",
    direction: "row",
    justifyContent: "space-between"
}))`
    width: 100%;
    margin-top: 8px;
    padding-bottom: 8px;
    border-bottom-width: 0.5px;
    border-bottom-color: ${({ theme }) => theme.SHADOW[3]}
`