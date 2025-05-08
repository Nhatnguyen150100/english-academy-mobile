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
      CFBundleURLTypes: {
        CFBundleURLSchemes: [
          "com.googleusercontent.apps.236267499846-ovjp737358c68tcbimjni4gqcd02da5j",
        ],
      },
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
    permissions: ["INTERNET"],
    intentFilters: [
      {
        action: "VIEW",
        data: [
          {
            scheme: "com.english.expo",
          },
        ],
        category: ["BROWSABLE", "DEFAULT"],
      },
    ],
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
    "expo-video",
    [
      "expo-video",
      {
        supportsBackgroundPlayback: true,
        supportsPictureInPicture: true,
      },
    ],
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
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
        },
        android: {
          extraProguardRules:
            "-keep class com.google.android.gms.internal.consent_sdk.** { *; }",
        },
      },
    ],
    [
      "react-native-google-mobile-ads",
      {
        androidAppId: "ca-app-pub-5232717859877283~4872565021",
        iosAppId: "ca-app-pub-5232717859877283~4872565021",
        delayAppMeasurementInit: true,
        userTrackingUsageDescription:
          "This identifier will be used to deliver personalized ads to you.",
      },
    ],
  ],
});
