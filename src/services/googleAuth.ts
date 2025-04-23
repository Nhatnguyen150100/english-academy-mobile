import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const config = {
  androidClientId:
    "236267499846-9eriiu3q9lp6egeopjbf7fhrpiujgisd.apps.googleusercontent.com",
  // androidClientId:
  //   "236267499846-m5kfeduqhscbmr1gtt9vq5r7u8gu2rre.apps.googleusercontent.com",
  // iosClientId:
  //   "236267499846-ovjp737358c68tcbimjni4gqcd02da5j.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  redirectUri: "https://auth.expo.io/@nhatnguyen150100/english-academy",
};

console.log("🔁 Redirect URI:", AuthSession.makeRedirectUri());

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(config);
  console.log("🚀 ~ useGoogleAuth ~ response:", response);

  const googleSignIn = async () => {
    try {
      const result = await promptAsync();
      console.log("🚀 ~ googleSignIn ~ result:", result);

      if (result?.type !== "success") {
        throw new Error("Login cancelled");
      }
    } catch (error) {
      console.error("Google Sign In Error:", error);
      throw error;
    }
  };

  return { googleSignIn, response, user: null };
};
