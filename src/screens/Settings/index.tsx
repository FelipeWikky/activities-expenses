import React, { useCallback, useRef } from "react";

import { Container, Welcome, OptionButton, OptionText, Spacer, LogoutIcon, UserIcon, UserIconBadge } from "./styles";

import { useAuth } from "../../contexts/auth/useAuth";
import { useTranslation } from "../../contexts/translation/useTranslation";
import { FlagButton } from "../../components/FlagButton";
import { useNavigation } from "@react-navigation/native";
import { ChangeLanguage, ChangeLanguageHandles } from "../../components/ChangeLanguage";

export const Settings: React.FC = () => {

    const { currentUser, signout } = useAuth();
    const { countryCode, t } = useTranslation();
    const navigation = useNavigation();

    const changeLanguageRef = useRef<ChangeLanguageHandles>(null);

    const onOpenChangeLanguage = useCallback(() => {
        changeLanguageRef.current?.open();
    }, [changeLanguageRef]);

    const onSignoutFromApp = useCallback(() => {
        const callback = () => navigation.navigate("Home");
        signout(callback);
    }, []);

    return (
        <Container>
            <ChangeLanguage ref={changeLanguageRef} />

            <OptionButton style={{ justifyContent: "flex-start" }}>
                <UserIconBadge>
                    <UserIcon />
                </UserIconBadge>
                <Welcome>
                    {t("label.hello", ",")} {currentUser?.email}
                </Welcome>
            </OptionButton>

            <Spacer style={{ marginBottom: 48 }} />

            <OptionButton onPress={onOpenChangeLanguage}>
                <OptionText>{t("label.change.language")}</OptionText>
                <FlagButton countryCode={countryCode} direction="row" modalVisible={false} onPress={() => { }} />
            </OptionButton>

            <Spacer />

            <OptionButton onPress={onSignoutFromApp}>
                <OptionText>
                    {t("label.signout")}
                </OptionText>

                <LogoutIcon />
            </OptionButton>

        </Container>
    );
}