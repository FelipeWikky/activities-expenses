import styled from 'styled-components/native';
import { getColorByType } from '../../utils/colors';
import { ButtonTextProps} from './types';


export const StyledButton = styled.TouchableOpacity<ButtonTextProps>`
    background-color: ${(props) => getColorByType(props.type)};
    border-radius: 50px;
    padding: 10px 30px;
    align-items: center;
    justify-content: center;
`;


export const StyledText = styled.Text<ButtonTextProps>`
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-family: ${({ theme }) => theme.FONTS.BOLD};
    font-size: ${({ theme }) => theme.SIZE.NORMAL}px;
`;

