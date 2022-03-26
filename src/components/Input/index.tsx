import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData } from 'react-native';
import { Container, Content, StyledInput, Label, Error, FAIcon, IOIcon } from './styles';
import { IconNames, InputProps, InputTypes} from './types'

const getIconByProps = (name: keyof typeof IconNames, filled = false, size?: number) => <FAIcon name={name} size={size} filled={filled} />;

const getPasswordEyeIcon = (name: any, action: () => void) => <IOIcon name={name} onPress={action} />;

export const Input: React.FC<InputProps> = ({ label, error, rightIcon, leftIcon, name, onChangeText, ...props }) => {

    const inputRef = useRef<TextInput>(null);
    const [showPassword, setShowPassword] = useState(!(props.type === InputTypes.password));

    const [filled, setFilled] = useState(false);
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        setFilled(props.value ? true : false)
    }, [props.value]);

    const passwordIcon = useMemo(() => {
        if (!(props.type === InputTypes.password)) return null;
        if (showPassword) return getPasswordEyeIcon('eye', () => setShowPassword(prev => !prev));
        return getPasswordEyeIcon('eye-off', () => setShowPassword(prev => !prev));
    }, [props.type, showPassword]);

    const onFocus = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(true);
        if (props.onFocus) props.onFocus(e);
    }, []);

    const onBlur = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(false);
        if (props.onBlur) props.onBlur(e);
    }, []);

    return (
        <Container>
            {label && (<Label>{label}</Label>)}
            <Content hasError={!!error}>
                {leftIcon && getIconByProps(leftIcon, filled || focused)}
                <StyledInput
                    {...props as any}
                    ref={inputRef}
                    secureTextEntry={!showPassword}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChangeText={value => {
                        if (onChangeText) onChangeText(name, value);
                    }}
                />
                {passwordIcon || rightIcon && getIconByProps(rightIcon)}
            </Content>
            {error && (<Error>*{error}</Error>)}
        </Container>
    );
}