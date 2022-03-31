import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorageClass {

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
            if (stringfied && stringfied.length > 0)
                return JSON.parse(stringfied) as T;
            return null;
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

const LocalStorage = new LocalStorageClass();

export { LocalStorage }