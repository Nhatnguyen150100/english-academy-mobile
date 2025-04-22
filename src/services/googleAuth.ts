import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * @description https://github.com/SSA-988/react-native-google-signin
 */

GoogleSignin.configure({
  webClientId:
    "236267499846-9eriiu3q9lp6egeopjbf7fhrpiujgisd.apps.googleusercontent.com",
  offlineAccess: true,
});

export const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));

    return userInfo;
  } catch (error) {
    console.error("Google Sign In Error:", error);
    throw error;
  }
};

export const googleSignOut = async () => {
  try {
    await GoogleSignin.signOut();
    await AsyncStorage.removeItem("userInfo");
  } catch (error) {
    console.error("Google Sign Out Error:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const userInfo = await AsyncStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error("Get Current User Error:", error);
    throw error;
  }
};
