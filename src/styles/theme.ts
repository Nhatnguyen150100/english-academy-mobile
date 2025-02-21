/**
 * Represents the light theme colors.
 */
const LightTheme = {
  primary: "#0756b1",
  secondary: "#202124",
  background: "rgb(242, 242, 242)",
  card: "rgb(255, 255, 255)",
  text: "rgb(28, 28, 30)",
  border: "rgb(216, 216, 216)",
  notification: "#0756b1",
};

/**
 * Represents the type for the theme object.
 */
export type ITheme = typeof LightTheme;

/**
 * Dark theme object.
 */
const DarkTheme: ITheme = {
  primary: "#f27a1a",
  secondary: "#efefef",
  background: "rgb(1, 1, 1)",
  card: "rgb(18, 18, 18)",
  text: "rgb(229, 229, 231)",
  border: "rgb(39, 39, 41)",
  notification: "rgb(255, 69, 58)",
};

const colors = {
  // Primary
  primary: "#6366F1",
  primaryLight: "#E0E7FF",
  primaryDark: "#4338CA",

  // Gray scale
  white: "#FFFFFF",
  gray50: "#F8FAFC",
  gray100: "#F1F5F9",
  gray200: "#E2E8F0",
  gray300: "#CBD5E1",
  gray400: "#94A3B8",
  gray500: "#64748B",
  gray600: "#475569",
  gray700: "#334155",
  gray800: "#1E293B",
  gray900: "#0F172A",
  black: "#000000",

  // Status colors
  success: "#10B981",
  error: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",

  // warning
  warningLight: "#F0BB65",
  warningDark: "#B45309"
};

export { LightTheme, DarkTheme, colors };
