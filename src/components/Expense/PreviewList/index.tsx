import { forwardRef, ForwardRefRenderFunction, useCallback, useImperativeHandle, useState } from "react";
import { useTranslation } from "../../../contexts/translation/useTranslation";
import { TRANSLATE_KEYS } from "../../../translate";
import { ExpenseItem, ExpenseItemStatus } from "../../../types/models/expenseItem";
import { Button } from "../../Button";
import { Icon } from "../../Icon";
import { Label } from "../../Label";
import { ListItem } from "../ListItem";

import { Modal, Container, Content, CloseContainer } from "./styles";
import { PreviewListHandles, PreviewListProps } from "./types";


const PreviewListComponent: ForwardRefRenderFunction<PreviewListHandles, PreviewListProps> = (props, ref) => {
    const { t, TranslateKeyType } = useTranslation();

    const [visible, setVisible] = useState(false);
    const [items, setItems] = useState<ExpenseItem[]>([]);
    const [typeSelected, setTypeSelected] = useState<ExpenseItemStatus>();

    const open = useCallback((itemsToShow?: ExpenseItem[], type?: ExpenseItemStatus) => {
        setItems(itemsToShow);
        setTypeSelected(type);
        setVisible(true);
    }, []);

    const close = useCallback(() => {
        setItems([]);
        setTypeSelected(undefined);
        setVisible(false);
    }, []);

    useImperativeHandle(ref, () => ({
        open, close
    }));

    return (
        <Modal animationType="fade" transparent={true} visible={visible} style={{ height: "100%" }}>
            <Container>
                <Content>
                    <CloseContainer>
                        <Label type="NORMAL_SMALL" color="LABEL">
                            {typeSelected ? t(`label.${typeSelected.toLowerCase()}` as typeof TranslateKeyType) : " "}
                        </Label>
                        <Button empty onPress={close}>
                            <Icon group="FontAwesome" name="close" color="TEXT" />
                        </Button>
                    </CloseContainer>

                    <ListItem fromItems={items} />
                </Content>
            </Container>
        </Modal>
    );
}

export const PreviewList = forwardRef(PreviewListComponent);