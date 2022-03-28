import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';

class LocalStorageClass {
    public database: SQLite.WebSQLDatabase;
    constructor() {
        this.database = SQLite.openDatabase("expenses.db", undefined, undefined, undefined, (db) => {
            db.transaction(tx => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS expenses (key TEXT NOT NULL, value TEXT)');
            })
        })
    }

    async setItem(key: string, value: string | number | object | Date | Array<any>): Promise<boolean> {
        try {
            const stringfy = JSON.stringify(value);
            this.database.transaction(tx => {
                tx.executeSql(
                    "INSERT INTO expenses VALUES (?, ?)",
                    [key, stringfy],
                    (_, result) => {
                    },
                    (_, error) => {
                        return true;
                    }
                )
            });
            // await AsyncStorage.setItem(key, stringfy);
            return true;
        } catch (error) {
            console.error('Error on Storage.setItem: ', error);
            return false;
        }
    }

    async getItem<T>(key: string): Promise<T | null> {
        try {
            const stringfied = await AsyncStorage.getItem(key);
            return JSON.parse(stringfied) as T;
        } catch (error) {
            console.error('Error on Storage.getItem: ', error);
            return null;
        }
    }

    async removeItem<T>(key: string): Promise<boolean> {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error on Storage.removeItem: ', error);
            return false;
        }
    }

    async getAllItems<T>(key: string): Promise<T[] | null> {
        try {
            const stringfied = await AsyncStorage.getItem(key);
            return JSON.parse(stringfied) as T[];
        } catch (error) {
            console.error('Error on Storage.getAllItems: ', error);
            return null;
        }
    }

}

class SqliteStorage {
    public database: SQLite.WebSQLDatabase;
    constructor(private readonly TABLE: string) {
        this.database = SQLite.openDatabase("expenses.db", undefined, undefined, undefined, (db) => {
            db.transaction(tx => {
                tx.executeSql(`CREATE TABLE IF NOT EXISTS ${TABLE} (key TEXT NOT NULL, value TEXT)`);
            })
        })
    }

    async count(): Promise<number | null> {
        return new Promise<number | null>((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(
                    `SELECT key FROM ${this.TABLE} ORDER BY key DESC LIMIT 1`,
                    [],
                    (_, result) => {
                        if (result && result.rows && result.rows.item && result.rows.item(0) && result.rows.item(0).key) {
                            resolve(result.rows.item(0).key);
                        }
                        resolve(null);
                    }
                )
            });
        });
    }

    async getAll<T>(): Promise<T[] | null> {
        try {
            return new Promise<T[] | null>((resolve, reject) => {
                this.database.transaction(tx => {
                    tx.executeSql(
                        `SELECT * FROM ${this.TABLE}`,
                        [],
                        (_, result) => {
                            const { rows } = result;
                            const data: T[] = [];
                            if (rows) {
                                for (let i = 0; i < rows.length; i++) {
                                    const item = rows.item(i);
                                    if (item && item.value)
                                        data.push(JSON.parse(item.value));
                                }
                                resolve(data);
                            }
                            resolve([]);
                        }
                    )
                })
            });
        } catch (error) {
            console.error('Error on Storage.getAllItems: ', error);
            return null;
        }
    }

    async get<T>(uniqueKey: string): Promise<T | null> {
        try {
            return new Promise<T | null>((resolve, reject) => {
                this.database.transaction(tx => {
                    tx.executeSql(
                        `SELECT * FROM ${this.TABLE} WHERE key = ?`,
                        [uniqueKey],
                        (_, result) => {
                            const { rows } = result;
                            if (rows) {
                                for (let i = 0; i < rows.length; i++) {
                                    const item = rows.item(i);
                                    if (item && item.value)
                                        resolve(JSON.parse(item.value));
                                }
                                resolve(null);
                            }
                            resolve(null);
                        }
                    )
                })
            });
        } catch (error) {
            console.error('Error on Storage.getAllItems: ', error);
            return null;
        }
    }

    async insert<T>(uniqueKey: string, data: T): Promise<T | null> {
        return new Promise<T | null>((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO ${this.TABLE} VALUES (?, ?)`,
                    [uniqueKey, JSON.stringify(data)],
                    (_, result) => {
                        resolve(data)
                    }
                )
            });
        });
    }

    async update<T>(uniqueKey: string, data: T): Promise<T | boolean | null> {
        return new Promise<T | boolean | null>((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(
                    `UPDATE ${this.TABLE} SET value = ? WHERE key = ?`,
                    [JSON.stringify(data), uniqueKey],
                    (_, result) => {
                        resolve(result.rowsAffected > 0);
                    }
                )
            });
        });
    }

    async delete<T>(uniqueKey: string): Promise<boolean | null> {
        return new Promise<boolean | null>((resolve, rejet) => {
            this.database.transaction(tx => {
                tx.executeSql(
                    `DELETE FROM ${this.TABLE} WHERE key = ?`,
                    [uniqueKey],
                    (_, result) => {
                        resolve(result.rowsAffected > 0);
                    }
                )
            });
        });
    }

    async custom(query: string, args: (string | number)[]): Promise<SQLite.SQLResultSetRowList> {
        return new Promise<SQLite.SQLResultSetRowList>((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(
                    query,
                    args,
                    (_, result) => {
                        resolve(result.rows)
                    }
                );
            });
        });
    }
}

const LocalStorage = new LocalStorageClass();

export {
    SqliteStorage,
    LocalStorage
}