import { Dimensions } from "react-native";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: space-around;
`;

export const Header = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
`;

export const HeaderContent = styled.View`
    flex-direction: row;
    align-items: flex-end;
`;

export const Content = styled.View`
    flex: 1;
    justify-content: center;
`;

type ItemRef = {
    innerRef: any;
}

export const Items = styled.ScrollView.attrs<ItemRef>(props => ({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    ref: props.innerRef
}))<ItemRef>`
      /* height: ${Number(Dimensions.get("window").height) - 200}px; */
      max-height: ${Number(Dimensions.get("window").height) * 0.60}px;
`;

export const Item = styled.View`
    border: 1px solid black;
    border-radius: 5px;
    padding: 16px 12px;
    width: ${Number(Dimensions.get("window").width) * 0.75}px;
    margin: 0px 50px;
`;

export const Footer = styled.View`
   
`;