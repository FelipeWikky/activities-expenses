import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
    async setItem(key: string, value: string | number | object | Date | Array<any>): Promise<boolean> {
        try {
            const stringfy = JSON.stringify(value);
            await AsyncStorage.setItem(key, stringfy);
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

export default new Storage();