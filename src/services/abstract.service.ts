import {LocalStorage as Storage} from "./storage";

export interface AbstractInterface<T> {
    create(data: T): Promise<T | boolean>;
    update(data: T): Promise<T | boolean | null>;
    remove(data: T): Promise<boolean>;
    get(id: keyof T): Promise<T | null>;
    getAll(): Promise<T[]>;
}

export abstract class AbstractClass<T> implements AbstractInterface<T> {
    constructor(public readonly KEY: string) { }

    async create(expenseItem: T) {
        let savedItems = await Storage.getAllItems<T>(this.KEY);
        if (!savedItems) savedItems = [];
        savedItems.push({
            ...expenseItem,
            id: savedItems.length
        });
        return await Storage.setItem(this.KEY, savedItems);
    }

    async getAll() {
        return await Storage.getAllItems<T>(this.KEY);
    }

    async remove(data: T, propertyKey?: string) {
        let savedItems = await Storage.getAllItems<T>(this.KEY);

        if (data?.[propertyKey]) {
            savedItems = savedItems.filter(item => String(item?.[propertyKey]) !== String(data?.[propertyKey]));
            return await Storage.setItem(this.KEY, savedItems);
        }
        return false;
    }

    async get(propertyKey: keyof T): Promise<T> {
        const allItems = await Storage.getAllItems<T>(this.KEY);
        return allItems.find(item => String(propertyKey) === String(item[propertyKey]));
    }

    async update(data: T, propertyKet?: string): Promise<boolean> {
        let savedItems = await Storage.getAllItems<T>(this.KEY);
        let savedItem = savedItems.find(item => String(item?.[propertyKet]) === String(data?.[propertyKet]));
        if (savedItem) {
            savedItem = {
                ...savedItem,
                ...data
            }
            return await Storage.setItem(this.KEY, savedItems);
        }
        return false;
    }
}