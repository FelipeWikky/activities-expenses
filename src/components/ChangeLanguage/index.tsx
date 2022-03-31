import { forwardRef, ForwardRefRenderFunction, useCallback, useImperativeHandle, useState } from "react"
import { useTranslation } from "../../contexts/translation/useTranslation";
import { LanguageType, CountryCode, LANGUAGE_KEY } from "../../translate";
import { Box } from "../../layout/Box";
import { FlagButton } from "../FlagButton";

import { Modal, Container, Content, Title, CloseIconButton, CloseIcon } from "./styles";

export type ChangeLanguageHandles = {
    open: () => void;
    close: () => void;
}

type ChangeLanguageProps = {}

const ChangeLanguageComponent: ForwardRefRenderFunction<ChangeLanguageHandles, ChangeLanguageProps> = (props, ref) => {
    const { t, onChangeLanguage } = useTranslation();
    const [visible, setVisible] = useState(false);

    const open = useCallback(() => {
        setVisible(true);
    }, []);

    const close = useCallback(() => {
        setVisible(false);
    }, []);

    useImperativeHandle(ref, () => ({
        open, close
    }));

    const handleChangeLanguage = useCallback((language: LanguageType, code: CountryCode) => {
        onChangeLanguage(language, code);
        close();
    }, []);

    return (
        <Modal visible={visible} transparent onRequestClose={() => close()}>
            <Container>
                <Content>
                    <Box direction="row" style={{ width: "100%" }} justifyContent="center">
                        <Title type="NORMAL" color="LABEL" strong>
                            {t("label.select.language")}
                        </Title>
                        <CloseIconButton onPress={() => close()}>
                            <CloseIcon />
                        </CloseIconButton>
                    </Box>

                    <FlagButton countryCode="BR" showCountryName onPress={(code) => handleChangeLanguage(LANGUAGE_KEY.pt_BR, code)} />

                    <FlagButton countryCode="US" showCountryName onPress={(code) => handleChangeLanguage(LANGUAGE_KEY.en_US, code)} />

                    <Box />
                </Content>
            </Container>
        </Modal>
    );
}

const ChangeLanguage = forwardRef(ChangeLanguageComponent);

export {
    ChangeLanguage
}