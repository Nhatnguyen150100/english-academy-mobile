import Store from "@store/index";
import { removeStoreDataAsync } from "@src/helpers/storage";
import { StoreEnum } from "@helpers/storage/storeEnum";
import { loggedOut } from "../store/redux/appSlice";
import RNRestart from "react-native-restart";

/**
 * Clears the user data by removing the token from the store and dispatching a loggedOut action.
 * @returns {Promise<void>} A promise that resolves once the user data is cleared.
 */
export async function clearUser(): Promise<void> {
  Store.dispatch(loggedOut());
  await removeStoreDataAsync(StoreEnum.AccessToken);
  await removeStoreDataAsync(StoreEnum.User);
  await removeStoreDataAsync(StoreEnum.isStarted);
  RNRestart.Restart();
}

/**
 * Signs out the user by clearing user data.
 */
export function signOut() {
  clearUser();
}
