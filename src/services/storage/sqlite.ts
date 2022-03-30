import * as SQLite from 'expo-sqlite';
import { Key } from 'react';

class SqliteStorage {
    public database: SQLite.WebSQLDatabase;
    constructor(private readonly TABLE: string) {
        this.database = SQLite.openDatabase("expenses.db", undefined, undefined, undefined, (db) => {
            db.transaction(tx => {
                tx.executeSql(
                    // 'DROP TABLE IF EXISTS expenses',
                    `CREATE TABLE IF NOT EXISTS ${TABLE} (id INTEGER PRIMARY KEY, title TEXT, description TEXT, finished BOOLEAN, hasError BOOLEAN, comment TEXT, createdAt TEXT, updatedAt TEXT, whenAt TEXT)`,
                    [],
                    (_, result) => {
                    },
                    (_, error) => {
                        console.error('erro on execute ', error);
                        return false;
                    }
                )
            })
        })
    }

    async count(key?: Key): Promise<number | null> {
        return new Promise<number | null>((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(
                    `SELECT count(*) as count FROM ${this.TABLE} ORDER BY ? DESC LIMIT 1`,
                    [String(key || "id")],
                    (_, result) => {
                        if (result && result.rows && result.rows.item && result.rows.item(0) && result.rows.item(0).count) {
                            resolve(result.rows.item(0).count);
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
                                    data.push(item)
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

    async get<T>(key: Key): Promise<T | null> {
        try {
            return new Promise<T | null>((resolve, reject) => {
                this.database.transaction(tx => {
                    tx.executeSql(
                        `SELECT * FROM ${this.TABLE} WHERE id = ?`,
                        [String(key)],
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

    async insert<T>(data: T): Promise<T | null> {
        return new Promise<T | null>((resolve, reject) => {
            this.database.transaction(tx => {
                if (data.hasOwnProperty("id")) delete data['id'];

                const keys = Object.keys(data);
                const keysQuery = keys.join(",");

                const values: any[] = [];
                for (const key of keys) {
                    if (data[key] instanceof Date) {
                        // values.push((new Date(data[key])).toISOString());
                        values.push(String(data[key]));
                    }
                    else if (data[key] !== null && data[key] !== undefined) {
                        values.push(data[key]);
                    } else {
                        values.push("");
                    }
                }

                const valuesQuery = Array(keys.length).fill("?").join(",");
                const query = `INSERT INTO ${this.TABLE} (${keysQuery}) VALUES (${valuesQuery})`;
                tx.executeSql(
                    query,
                    values,
                    (_, result) => {
                        resolve(data)
                    },
                    (_, error) => {
                        console.error('error on insert ', error);
                        return false;
                    }
                )
            });
        });
    }

    async update<T>(key: Key, data: T): Promise<T | boolean | null> {
        return new Promise<T | boolean | null>((resolve, reject) => {
            this.database.transaction(tx => {
                if (data.hasOwnProperty("id")) delete data['id'];

                const keys = Object.keys(data);
                const queryOptions: string[] = [];
                const values: any[] = [];
                for (const key of keys) {
                    if (data[key] instanceof Date) {
                        values.push(String(data[key]));
                    }
                    else if (data[key] !== null && data[key] !== undefined) {
                        values.push(data[key]);
                    } else {
                        values.push("");
                    }
                    queryOptions.push(`${key} = ?`);
                }
                values.push(String(key));
                const query = `UPDATE ${this.TABLE} SET ${queryOptions.join(",")} WHERE id = ?`;
                tx.executeSql(
                    query,
                    values,
                    (_, result) => {
                        resolve(result.rowsAffected > 0);
                    }
                )
            });
        });
    }

    async delete<T>(key: string): Promise<boolean | null> {
        return new Promise<boolean | null>((resolve, rejet) => {
            this.database.transaction(tx => {
                tx.executeSql(
                    `DELETE FROM ${this.TABLE} WHERE id = ?`,
                    [key],
                    (_, result) => {
                        resolve(result.rowsAffected > 0);
                    }
                )
            });
        });
    }

    async custom(query: string, args: (string | number)[]): Promise<SQLite.SQLResultSetRowList | null> {
        return new Promise<SQLite.SQLResultSetRowList | null>((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(
                    query,
                    args,
                    (_, result) => {
                        resolve(result.rows)
                    },
                    (_, error) => {
                        console.error("error on custom ", error);
                        reject(null);
                        return false;
                    }
                );
            });
        });
    }
}

export {
    SqliteStorage,
}