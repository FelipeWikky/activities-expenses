import React, { useCallback, useState } from "react";
import { useTranslation } from "../../../contexts/translation/useTranslation";
import { Box } from "../../../layout/Box";
import { ExpenseFilter } from "../../../services/expense.service";

import { SearchInput, FilterChecker } from "./styles";

type FilterListProps = {
    handleFilter: (filters: ExpenseFilter) => void;
}

export const FilterList: React.FC<FilterListProps> = ({ handleFilter }) => {
    const {t} = useTranslation();

    const [filters, setFilters] = useState<ExpenseFilter>({
        finished: false,
        error: false,
        whenAt: false,
        pending: false,
        search: ""
    });

    const onChangeFilter = useCallback((key: keyof ExpenseFilter, newValue: string | boolean) => {
        let obj = {...filters};

        switch (key) {
            case "search":
                obj = { ...obj, [key]: String(newValue) };
                setFilters(obj);
                break;
            default:
                obj = { ...obj, [key]: !!(newValue) };
                setFilters(obj);
                break;
        }
        handleFilter(obj);
    }, [filters]);

    return (
        <>
            <SearchInput
                placeholder={t("label.placeholder.input.search")}
                value={filters.search}
                onChangeText={text => onChangeFilter("search", text)}
            />
            <Box direction="row" style={{ marginTop: 4, marginLeft: 8 }}>
                <FilterChecker
                    label={t("label.pending")}
                    checked={filters.pending}
                    fillColor="TEXT"
                    onPress={() => onChangeFilter("pending", !filters.pending)}
                />
                <FilterChecker
                    label={t("label.finished")}
                    checked={filters.finished}
                    onPress={() => onChangeFilter("finished", !filters.finished)}
                />
                <FilterChecker
                    label={t("label.problem")}
                    checked={filters.error}
                    fillColor="DANGER"
                    onPress={() => onChangeFilter("error", !filters.error)}
                />
                <FilterChecker
                    label={t("label.have.when", "?")}
                    checked={filters.whenAt}
                    fillColor="LABEL"
                    onPress={() => onChangeFilter("whenAt", !filters.whenAt)}
                />
            </Box>
        </>
    );
}