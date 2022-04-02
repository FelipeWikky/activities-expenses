import React, { useCallback, useMemo, useRef } from "react";

import {
    Container, Content, Header,
    GrapContainer, GraphBar, GraphTitle, GraphButton
} from "./styles";

import { Label } from "../../components/Label";
import { useTranslation } from "../../contexts/translation/useTranslation";
import { useExpense } from "../../contexts/expense/useExpense";
import { ExpenseItem, ExpenseItemStatus } from "../../types/models/expenseItem";
import { PreviewList } from "../../components/Expense/PreviewList";
import { PreviewListHandles } from "../../components/Expense/PreviewList/types";

const getPercentage = (value: number, total: number) => {
    const percentage = ((value * 10) / total);
    return percentage * 100;
}

export const Dashboard: React.FC = () => {
    const { t } = useTranslation();
    const { items: expenseItems } = useExpense();

    const graphData = useMemo(() => {
        const total = expenseItems.length * 10;

        const finished = expenseItems.filter(item => !!(item.finished)).length;
        const problem = expenseItems.filter(item => !!(item.hasError)).length;
        const pending = expenseItems.filter(item => !(item.finished) && !(item.hasError)).length;

        return {
            finished: {
                percentage: getPercentage(finished, total),
                total: finished
            },
            problem: {
                percentage: getPercentage(problem, total),
                total: problem
            },
            pending: {
                percentage: getPercentage(pending, total),
                total: pending
            }
        }

    }, [expenseItems]);

    const ItemQuantity = useMemo(() => {
        if (expenseItems.length === 0) return "";
        return expenseItems?.length > 1 ? t("label.items") : t("label.item")
    }, [expenseItems]);

    const previewListRef = useRef<PreviewListHandles>(null);
    const onSelectGraph = useCallback((type: ExpenseItemStatus) => {
        let finded: ExpenseItem[] = [];
        switch (type) {
            case ExpenseItemStatus.FINISHED:
                finded = expenseItems.filter(item => item.finished);
                break;
            case ExpenseItemStatus.PROBLEM:
                finded = expenseItems.filter(item => item.hasError);
                break;
            case ExpenseItemStatus.PENDING:
                finded = expenseItems.filter(item => !item.finished && !item.hasError);
                break;
        }
        if (finded.length > 0) {
            previewListRef?.current?.open(finded, type);
        }
    }, [expenseItems, previewListRef]);

    return (
        <Container>

            <PreviewList ref={previewListRef} />

            <Content>
                <Header>
                    <Label type="SUB_TITLE">
                        {t("label.dashboard")}
                    </Label>
                    <Label type="NORMAL" style={{ marginLeft: 12 }}>
                        ({expenseItems.length} {ItemQuantity})
                    </Label>
                </Header>

                <GrapContainer>

                    <GraphButton onPress={() => onSelectGraph(ExpenseItemStatus.FINISHED)}>
                        <GraphTitle>
                            {t("label.finished")} ({graphData.finished.total})
                        </GraphTitle>
                        <GraphBar
                            percentage={graphData.finished.percentage}
                            color="SUCCESS"
                        />
                    </GraphButton>

                    <GraphButton onPress={() => onSelectGraph(ExpenseItemStatus.PROBLEM)}>
                        <GraphTitle>
                            {t("label.problem")} ({graphData.problem.total})
                        </GraphTitle>
                        <GraphBar
                            percentage={graphData.problem.percentage}
                            color="DANGER"
                        />
                    </GraphButton>

                    <GraphButton onPress={() => onSelectGraph(ExpenseItemStatus.PENDING)}>
                        <GraphTitle>
                            {t("label.pending")} ({graphData.pending.total})
                        </GraphTitle>
                        <GraphBar
                            percentage={graphData.pending.percentage}
                            color="TEXT"
                        />
                    </GraphButton>

                </GrapContainer>
            </Content>
        </Container>
    )
}