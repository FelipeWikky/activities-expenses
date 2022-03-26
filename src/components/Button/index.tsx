import { ButtonTextProps } from './types';
import { StyledButton, StyledText } from './styles';

export const Button: React.FC<ButtonTextProps> = ({ children, ...props }) => {
    return (
        <StyledButton {...props as any}>
            {children ? (children) : (<StyledText {...props as any}>{props.text}</StyledText>)}
        </StyledButton>
    );
};