import React, { useCallback, useEffect, useRef } from 'react';
import {
    Container, Content,
    Header, Title, SubTitle,
    Footer, Version,
    SigninContainer,
} from './styles';
import { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

import { Button } from '../../components/Button';
import { Signin, SigninHandles } from '../Signin';
import { useTranslation } from '../../contexts/translation/useTranslation';
import { ChangeLanguage, ChangeLanguageHandles } from '../../components/ChangeLanguage';
import { FlagButton } from '../../components/FlagButton';
import { LocalStorage } from '../../services/storage/local';
import { Constants } from '../../utils/constants';
import { User } from '../../types/models/user';
import { useNavigation } from '@react-navigation/native';
import { useToast } from '../../hooks/useToast';

const bezier = Easing.bezier(0.25, 0.1, 0.25, 1);

export const Home: React.FC = () => {
    const { t, countryCode } = useTranslation();
    const navigation = useNavigation();
    const toast = useToast();

    const topHeader = useSharedValue(-150);
    const scaleHeader = useSharedValue(0.1);
    const scaleContent = useSharedValue(0.1);
    const opacityTitle = useSharedValue(0);

    const headerStyles = useAnimatedStyle(() => {
        return {
            top: withTiming(topHeader.value, {
                duration: 2000,
                easing: bezier
            }),
            transform: [{
                scale: withTiming(scaleHeader.value, { duration: 3000, easing: bezier })
            }]
        };
    });

    const contentStyles = useAnimatedStyle(() => {
        return {
            transform: [{
                scale: withTiming(scaleContent.value, { duration: 1500, easing: bezier })
            }]
        }
    });

    const opacityStyles = useAnimatedStyle(() => {
        return {
            opacity: withTiming(opacityTitle.value, {
                duration: 2000,
                easing: bezier
            })
        }
    });

    useEffect(() => {
        setTimeout(() => {
            scaleContent.value = 1;
            scaleHeader.value = 2;
            topHeader.value = 0;
            opacityTitle.value = 1;
        }, 100);
    }, []);

    const signinRef = useRef<SigninHandles>(null);
    const onOpenSignin = useCallback(async () => {
        const user = await LocalStorage.getItem<User>(Constants.STORAGE.AUTH);
        if (user) {
            navigation.navigate("Main");
            // toast.show(t("label.welcome.back"), toast.STATUS.INFO);
        } else {
            signinRef.current.openModal();
        }
    }, [signinRef]);

    const changeLanguageRef = useRef<ChangeLanguageHandles>(null);

    return (
        <Container>
            <Signin ref={signinRef} />

            <ChangeLanguage ref={changeLanguageRef} />

            {/* TODO: Inserir texto com o translation e rever nome do app */}
            <Header style={headerStyles}>
                <Title>Follow</Title>
                <SubTitle>expenses</SubTitle>
            </Header>
            <Content style={contentStyles}>

                <SigninContainer style={opacityStyles}>
                    <Button text={t("label.signin")} type='DEFAULT' onPress={onOpenSignin} />
                </SigninContainer>

                <SigninContainer style={opacityStyles}>
                    <Button text={t("label.signup")} type='DEFAULT' />
                </SigninContainer>

            </Content>

            <Footer style={contentStyles}>
                <FlagButton countryCode={countryCode} onPress={() => changeLanguageRef.current?.open()} />
                <Version>{t("label.version")} 1.0.0</Version>
            </Footer>
        </Container>
    );
}