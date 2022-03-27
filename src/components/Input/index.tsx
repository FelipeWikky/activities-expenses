import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData } from 'react-native';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Controller, Control } from "react-hook-form";

import { Container, Content, StyledInput, FAIcon, IOIcon, DynamicLabel } from './styles';
import { IconNames, InputProps, InputTypes } from './types';

import { Label } from '../Label';
import { Constants } from '../../utils/constants';
import { THEME } from '../../theme';

const getIconByProps = (name: keyof typeof IconNames, filled = false, size?: number) => <FAIcon name={name} size={size} filled={filled} />;

const getPasswordEyeIcon = (name: any, action: () => void) => <IOIcon name={name} onPress={action} />;

export const Input: React.FC<InputProps> = ({ control, name, label, error, rightIcon, leftIcon, onChangeText, placeholder, ...props }) => {

    const inputRef = useRef<TextInput>(null);
    const [showPassword, setShowPassword] = useState(!(props.type === InputTypes.password));

    const [filled, setFilled] = useState(false);
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        setFilled(props.value ? true : false)
    }, [props.value]);
    useEffect(() => {
        setFilled(props.value ? true : false)
    }, [control]);

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

    const labelTopPosition = useSharedValue(9);
    const labelLeftPosition = useSharedValue(8);

    const labelPositionStyles = useAnimatedStyle(() => ({
        top: withTiming(labelTopPosition.value, {
            duration: 500,
            easing: Constants.BEZIER
        }),
        left: withTiming(labelLeftPosition.value, {
            duration: 500,
            easing: Constants.BEZIER
        }),
    }));

    useEffect(() => {
        if (filled || focused) {
            labelTopPosition.value = -2;
            labelLeftPosition.value = 0;
        } else {
            labelTopPosition.value = 18;
            labelLeftPosition.value = 8;
        }
    }, [filled, focused]);

    return (
        <Container>
            {!!(label) && (
                <DynamicLabel type='NORMAL_SMALL' strong style={[labelPositionStyles, error && { color: THEME.COLORS.ERROR }]}>
                    {label}
                </DynamicLabel>
            )}
            <Content hasError={!!error}>
                {leftIcon && getIconByProps(leftIcon, filled || focused)}
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { onChange, value } }) => {
                        if (value) setFilled(true);
                        return (
                            <StyledInput
                                value={value}
                                placeholder={(filled || focused) ? placeholder : ""}
                                secureTextEntry={!showPassword}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onChangeText={text => {
                                    setFilled(!!(text.trim()))
                                    onChange(text);
                                }}
                            />
                        )
                    }}
                />
                {passwordIcon || rightIcon && getIconByProps(rightIcon)}
            </Content>
            {error && (<Label type='ERROR_LOW' style={{ marginLeft: 6 }}>*{error}</Label>)}
        </Container>
    );
}