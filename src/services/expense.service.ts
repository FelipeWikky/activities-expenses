import { ExpenseItem } from "../types/models/expenseItem";
import { AbstractInterface } from "./abstract.service";
import Storage from "./storage";

const KEY = "FOLLOW_EXPENSES_DATA";

class ExpenseServiceClass implements AbstractInterface<ExpenseItem> {
    async create(expenseItem: ExpenseItem) {
        let savedItems = await Storage.getAllItems<ExpenseItem>(KEY);
        if (!savedItems) savedItems = [];
        savedItems.push({
            ...expenseItem,
            id: savedItems.length
        });
        return await Storage.setItem(KEY, savedItems);
    }

    async getAll() {
        return await Storage.getAllItems<ExpenseItem>(KEY);
    }

    async remove(data: ExpenseItem) {
        let savedItems = await Storage.getAllItems<ExpenseItem>(KEY);
        if (data.id) {
            savedItems = savedItems.filter(item => String(item?.id) !== String(data?.id));
        } else {
            savedItems = savedItems.filter(item => String(item.title) !== String(data.title) && String(item.description) !== String(data.description));
        }
        return await Storage.setItem(KEY, savedItems);
    }

    async get(id: string): Promise<ExpenseItem> {
        const allItems = await Storage.getAllItems<ExpenseItem>(KEY);
        return allItems.find(item => String(id) === String(item.id));
    }

    async update(data: ExpenseItem): Promise<boolean> {
        let savedItems = await Storage.getAllItems<ExpenseItem>(KEY);
        let savedItem = savedItems.find(item => String(item?.id) === String(data?.id));
        if(savedItem) {
            savedItem = {
                ...savedItem,
                ...data
            }
            return await Storage.setItem(KEY, savedItems);
        }
        return false;
    }
}

const ExpenseService = new ExpenseServiceClass();

export {
    ExpenseService
}