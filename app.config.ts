import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  owner: "nhatnguyen150100",
  name: "English Academy",
  description: "This app is English Academy for everyone",
  slug: "english-academy",
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
    url: "https://u.expo.dev/db8a8a4a-91f2-49bd-86b0-6ab4cc4d35c9",
  },
  extra: {
    eas: {
      projectId: "db8a8a4a-91f2-49bd-86b0-6ab4cc4d35c9",
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
    [
      "@react-native-google-signin/google-signin",
      {
        iosUrlScheme:
          "com.googleusercontent.apps.236267499846-ovjp737358c68tcbimjni4gqcd02da5j",
      },
    ],
  ],
});
