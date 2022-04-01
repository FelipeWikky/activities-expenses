import React, { useEffect, useMemo } from "react";
import { Control, FieldError, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "../../../contexts/translation/useTranslation";
import { Box } from "../../../layout/Box";
import { Line } from "../../../layout/Line";

import { Content, Title, Description } from "./styles";

import { ExpenseItem } from "../../../types/models/expenseItem";
import { formatDateTime } from "../../../utils/format";
import { Checkbox } from "../../Checkbox";
import { Input } from "../../Input";
import { DatePicker } from "../../DatePicker";

type ExpenseFormProps = {
    control: Control<any>;
    errors?: { [x in keyof ExpenseItem]?: FieldError };
    createdAt?: string | Date;
    updatedAt?: string | Date;

    viewData?: ExpenseItem;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ control, errors, createdAt, updatedAt, viewData }) => {
    const { t } = useTranslation();

    const createdAsSameUpdated = useMemo(() => {
        if (createdAt === updatedAt) return true;
        return false;
    }, [createdAt, updatedAt]);

    return (
        <Content>
            <Box>
                <Input
                    control={control} type="text" name="title"
                    label={t("label.activity")}
                    placeholder={t("label.placeholder.activity.activity")}
                    error={errors?.title?.message}
                    viewValue={viewData?.title}
                    editable={!(viewData)}
                />
            </Box>

            <Line shadow={2} marginVertical={12} />

            <Box>
                <Input
                    control={control} type="text" name="description"
                    label={t("label.description")}
                    placeholder={t("label.placeholder.activity.description")}
                    error={errors?.description?.message}
                    viewValue={viewData?.description}
                    editable={!(viewData)}
                />
            </Box>

            <Line shadow={2} marginVertical={12} />

            <Box>
                <DatePicker
                    editable={!(viewData)}
                    type="datetime"
                    name="whenAt"
                    control={control}
                    label={t("label.when.to", "?")}
                    viewValue={viewData?.whenAt}
                />
            </Box>

            <Line shadow={2} marginVertical={12} />

            <Box direction="row" justifyContent="space-between">
                <Box>
                    <Title>{t("label.finished", "?")}</Title>
                    <Checkbox
                        control={control}
                        name="finished"
                        icon={{
                            background: "SUCCESS",
                            color: "WHITE"
                        }}
                        editable={!(viewData)}
                    />
                </Box>
                <Box>
                    <Title>{t("label.has.problem", "?")}</Title>
                    <Checkbox
                        control={control}
                        name="hasError"
                        icon={{
                            background: "DANGER",
                            color: "WHITE"
                        }}
                        editable={!(viewData)}
                    />
                </Box>
            </Box>

            <Line shadow={2} marginVertical={12} />

            <Box>
                <Input
                    control={control} type="text" name="comment" label={t("label.comment")}
                    placeholder={t("label.placeholder.activity.comment")}
                    error={errors?.comment?.message}
                    editable={!(viewData)}
                />
            </Box>

            <Line shadow={2} marginVertical={12} />

            <Box direction="row" alignItems="center" justifyContent="space-between">
                <Title>
                    {!!(createdAt) ? t("label.created.at") : t("label.created.at.in")}
                </Title>
                <Description style={{ marginBottom: 2 }}>
                    {formatDateTime(createdAt || new Date())}
                </Description>
            </Box>

            {!!(updatedAt) && <Line shadow={2} marginVertical={12} />}

            {!createdAsSameUpdated && (
                <Box direction="row" alignItems="center" justifyContent="space-between">
                    <Title>{t("label.updated.at")}</Title>
                    <Description style={{ marginBottom: 2 }}>
                        {formatDateTime(updatedAt)}
                    </Description>
                </Box>
            )}
        </Content>
    );
}