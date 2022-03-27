import styled from 'styled-components/native';
import { getColorByType } from '../../utils/colors';
import { Constants } from '../../utils/constants';
import { ButtonTextProps} from './types';


export const StyledButton = styled.TouchableOpacity.attrs(props => ({
    activeOpacity: Constants.BUTTON_CLICK_OPACITY
}))<ButtonTextProps>`
    background-color: ${(props) => getColorByType(props.type)};
    border-radius: 50px;
    padding: 10px 30px;
    align-items: center;
    justify-content: center;
`;

export const StyledText = styled.Text<ButtonTextProps>`
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-family: ${({ theme }) => theme.FONTS.BOLD};
    font-size: ${({ theme, textSize }) => textSize ? theme.SIZE[textSize] : theme.SIZE.NORMAL}px;
`;