import { ExpenseItem } from "../types/models/expenseItem";
import { AbstractInterface } from "./abstract.service";
import { SqliteStorage } from "./storage/sqlite";

const TABLE_NAME = "expenses";

class ExpenseServiceClass implements AbstractInterface<ExpenseItem> {
    repository: SqliteStorage;
    constructor() {
        this.repository = new SqliteStorage(TABLE_NAME);
    }

    async create(expenseItem: ExpenseItem) {
        const newItem = {
            ...expenseItem,
            createdAt: new Date(),
            updatedAt: new Date()
        } as ExpenseItem;
        return await this.repository.insert<ExpenseItem>(newItem);
    }

    async getAll() {
        return await this.repository.getAll<ExpenseItem>();
    }

    async remove(data: ExpenseItem) {
        return await this.repository.delete<ExpenseItem>(String(data.id));
    }

    async get(id: string): Promise<ExpenseItem> {
        return await this.repository.get<ExpenseItem>(id)
    }

    async update(data: ExpenseItem) {
        data.updatedAt = new Date();
        return await this.repository.update<ExpenseItem>(String(data?.id), data);
    }

    async getWithFilter(filters: ExpenseFilter): Promise<ExpenseItem[]> {
        const { error, finished, pending, search, whenAt } = filters;
        let query = `SELECT * FROM ${TABLE_NAME}`;
        let hasBefore = false;
        if (search.trim() || finished || error || whenAt || pending) query += ` WHERE `;

        if (search.trim()) {
            query += `(title LIKE '%${search}%' OR description LIKE '%${search}%' OR comment LIKE '%${search}%')`;
            hasBefore = true;
        }
        if (pending) {
            query += `${hasBefore ? " AND " : " "} (finished = 0)`;
            hasBefore = true;
        }
        if (finished) {
            query += `${hasBefore ? " AND " : " "} (finished = 1)`;
            hasBefore = true;
        }
        if (error) {
            query += `${hasBefore ? " AND " : " "} (hasError = 1)`;
            hasBefore = true;
        }
        if (whenAt) {
            query += `${hasBefore ? " AND " : " "} (whenAt IS NOT NULL AND whenAt <> "")`;
            hasBefore = true;
        }
        const select = await this.repository.custom(query, []);
        const filtereds: ExpenseItem[] = [];
        if (select) {
            for (let i = 0; i < select.length; i++) {
                filtereds.push(select.item(i));
            }
        }
        return filtereds;
    }
}

const ExpenseService = new ExpenseServiceClass();

export {
    ExpenseService
}

export type ExpenseFilter = {
    search?: string;
    finished?: boolean;
    error?: boolean;
    whenAt?: boolean;
    pending?: boolean;
}