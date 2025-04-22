import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  // owner: "english-academy",
  name: "English Academy",
  description: "This app is English Academy for everyone",
  slug: "english-academic",
  scheme: "com.english.expo",
  version: "1.0.0",
  sdkVersion: "52.0.0",
  orientation: "portrait",
  icon: "./src/assets/images/english_icon.png",
  userInterfaceStyle: "automatic",
  runtimeVersion: "1.0.0",
  assetBundlePatterns: ["./src/assets/images/*"],
  splash: {
    image: "./src/assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    bundleIdentifier: "com.english.expo",
    buildNumber: "1.0.0",
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
    },
  },
  web: {
    bundler: "metro",
  },
  platforms: ["ios", "android"],
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.english.expo",
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
  plugins: [
    "expo-font",
    "expo-localization",
    [
      "expo-image-picker",
      {
        photosPermission:
          "The app accesses your photos to let you create blog and share them with your friends.",
      },
    ],
  ],
});
