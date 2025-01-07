import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "English Academy",
  description: "This app is English Academy for everyone",
  slug: "english-academic",
  scheme: "com.react-native.expoboilerplate",
  version: "1.0.0",
  sdkVersion: "52.0.0",
  orientation: "portrait",
  icon: "./src/assets/images/english_icon.png",
  userInterfaceStyle: "automatic",
  runtimeVersion: {
    policy: "sdkVersion",
  },
  assetBundlePatterns: ["./src/assets/images/*"],
  splash: {
    image: "./src/assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    bundleIdentifier: "com.milvasoft.expoboilerplate",
    buildNumber: "1.0.0",
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
    },
  },
  web: {
    bundler: "metro",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.milvasoft.expoboilerplate",
    versionCode: 1,
  },
  updates: {
    enabled: true,
    url: "https://u.expo.dev/49e4e24d-c928-4ff1-815d-f1a58ca580bd",
  },
  extra: {
    eas: {
      projectId: "49e4e24d-c928-4ff1-815d-f1a58ca580bd",
    },
  },
  plugins: ["expo-font", "expo-localization"],
});
