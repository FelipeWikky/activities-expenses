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

    async getWithFilter({ error, finished, search }: ExpenseFilter) {
        const query = `SELECT * FROM ${TABLE_NAME}`
    }
}

const ExpenseService = new ExpenseServiceClass();

export {
    ExpenseService
}

type ExpenseFilter = {
    finished?: boolean;
    error?: boolean;
    search?: string;
}