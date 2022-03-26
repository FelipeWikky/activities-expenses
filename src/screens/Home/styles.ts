import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.COLORS.BG_LOW};
  position: relative;
`;

export const Header = styled(Animated.View)`
  align-items: flex-end;
  flex-direction: row;
  margin-top: 20%;
  position: relative;
`;

export const Content = styled(Animated.View)`
  align-items: center;
  justify-content: space-evenly;
  background-color: ${({ theme }) => theme.COLORS.BG_MED};
  border-radius: 10px;
  height: 30%;
  width: 75%;
`;

export const Title = styled(Animated.Text)`
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
  font-size: ${({ theme }) => theme.SIZE.lg}px;
  color: ${({ theme }) => theme.COLORS.TEXT};
`;

export const SubTitle = styled(Animated.Text)`
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
  font-size: ${({ theme }) => theme.SIZE.sm}px;
  color: ${({ theme }) => theme.COLORS.TEXT};
  margin: 0px 0px 8px 8px;
`;

export const SigninContainer = styled(Animated.View)`
`;

export const SigninTouchable = styled.TouchableOpacity`
  color: ${({ theme,  }) => theme.COLORS.TEXT};
  background-color: ${({ theme }) => theme.COLORS.COLOR_300};
  border-radius: 50px;
  padding: 10px 30px;
  align-items: center;
  justify-content: center;
`;

export const SigninText = styled.Text`
  color: ${({ theme }) => theme.COLORS.TEXT};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
  font-size: ${({ theme }) => theme.SIZE.S3}px;
`;

export const Footer = styled(Animated.View)`
  align-items: flex-start;
  flex-direction: row;
  margin-bottom: 10%;
`;

export const Version = styled(Animated.Text)`
  color: ${({ theme }) => theme.COLORS.TEXT};
  font-family: ${({ theme }) => theme.FONTS.MEDIUM};
  font-size: ${({ theme }) => theme.SIZE.S1_5}px;
`;

