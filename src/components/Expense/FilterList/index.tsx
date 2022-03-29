import React, { useCallback, useState } from "react";
import { Box } from "../../../layout/Box";
import { ExpenseFilter } from "../../../services/expense.service";

import { SearchInput, FilterChecker } from "./styles";

type FilterListProps = {
    handleFilter: (key: keyof ExpenseFilter, newVale: string | boolean) => void;
}

export const FilterList: React.FC<FilterListProps> = ({ handleFilter }) => {
    const [search, setSearch] = useState("");
    const [finished, setFinished] = useState(false);
    const [error, setError] = useState(false);
    const [whenAt, setWhenAt] = useState(false);
    const [pending, setPending] = useState(false);

    const onChangeFilter = useCallback((key: keyof ExpenseFilter, newValue: string | boolean) => {
        switch (key) {
            case "finished":
                setFinished(!!(newValue));
                break;
            case "hasError":
                setError(!!(newValue));
                break;
            case "hasWhen":
                setWhenAt(!!(newValue));
                break;
            case "isPending":
                setPending(!!(newValue));
                break;
            case "search":
                setSearch(String(newValue));
                break;
        }
        handleFilter(key, newValue);
    }, []);

    return (
        <>
            <SearchInput
                placeholder="Digite algo para buscar"
                value={search}
                onChangeText={text => onChangeFilter("search", text)}
            />
            <Box direction="row" style={{ marginTop: 4, marginLeft: 8 }}>
                <FilterChecker
                    label="Finalizado"
                    checked={finished}
                    onPress={() => onChangeFilter("finished", !finished)}
                />
                <FilterChecker
                    label="Problema"
                    checked={error}
                    fillColor="DANGER"
                    onPress={() => onChangeFilter("hasError", !error)}
                />
                <FilterChecker
                    label="Pendente"
                    checked={pending}
                    fillColor="TEXT"
                    onPress={() => onChangeFilter("isPending", !pending)}
                />
                <FilterChecker
                    label="Possui quando?"
                    checked={whenAt}
                    fillColor="LABEL"
                    onPress={() => onChangeFilter("hasWhen", !whenAt)}
                />
            </Box>
        </>
    );
}