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
import { useTranslation } from '../../hooks/useTranslation';

const bezier = Easing.bezier(0.25, 0.1, 0.25, 1);

const Home: React.FC = () => {
    const { t } = useTranslation();

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
    const onOpenSignin = useCallback(() => {
        signinRef.current.openModal();
    }, [signinRef]);

    return (
        <Container>
            <Signin ref={signinRef} />

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
                <Version>{t("label.version")} 1.0.0</Version>
            </Footer>
        </Container>
    );
}

export default Home;