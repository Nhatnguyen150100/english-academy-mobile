import AsyncStorage from "@react-native-async-storage/async-storage";
import { isObjectLike } from "@helpers/global";
import { StoreEnum } from "./storeEnum";

/**
 * Adds data to the storage with the specified key.
 * If the value is an object, it will be converted to a JSON string before storing.
 *
 * @param key - The key to associate with the data.
 * @param value - The value to store.
 * @returns A Promise that resolves when the data is successfully stored, or rejects if there was an error.
 */
export const addStoreDataAsync = async (
  key: StoreEnum,
  value: any
): Promise<void> => {
  try {
    if (isObjectLike(value)) {
      value = JSON.stringify(value);
    }
    await AsyncStorage.setItem(StoreEnum[key], value);
  } catch (e) {
    console.error(`Error saving data to storage: ${e}`);
    throw e;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
/**
 * Retrieves data from AsyncStorage based on the provided key.
 *
 * @param key - The key to retrieve the data from AsyncStorage.
 * @returns A promise that resolves to the retrieved data, or an empty string if the data is not found or an error occurs.
 */
export const getStoreDataAsync = async (key: StoreEnum): Promise<any> => {
  try {
    const value = await AsyncStorage.getItem(StoreEnum[key]);
    if (value) return JSON.parse(value);
    return null;
  } catch (e) {
    console.error(`Error retrieving data from storage: ${e}`);
    return null;
  }
};

/**
 * Retrieves a string value from the storage based on the provided key.
 * @param key - The key used to retrieve the value from the storage.
 * @returns A promise that resolves to the retrieved string value, or an empty string if the value is not found or an error occurs.
 */
export const getStoreStringAsync = async (key: StoreEnum): Promise<string> => {
  try {
    const value = await AsyncStorage.getItem(StoreEnum[key]);
    if (value) return value;
    return "";
  } catch (e) {
    console.log(e);
    return "";
  }
};

/**
 * Removes the data associated with the specified key from the storage.
 *
 * @param key - The key of the data to be removed.
 * @returns A Promise that resolves when the data is successfully removed.
 */
export const removeStoreDataAsync = async (key: StoreEnum): Promise<void> => {
  try {
    await AsyncStorage.removeItem(StoreEnum[key]);
  } catch (exception) {
    console.error('error');
  }
};
