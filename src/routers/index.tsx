import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAppSelector } from "@src/store";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme } from "@src/hooks";
import { navigationRef } from "../helpers/router";
import BottomNavigation from "./BottomNavigation";
import { ScreenOptions } from "@utils/ScreenOptions";
import Routes, { RootStackParams } from "@utils/Routes";
import Login from "@modules/auth/Login";
import OneStepScreen from "@modules/getting-started/OneStepScreen";
import Toast from "react-native-toast-message";
import Register from "@modules/auth/Register";
import ProfileStack from "./stacks/ProfileStack";
import MissionDaily from "@modules/app/mission-daily/MissionDaily";
import ChatScreen from "@modules/app/chat/ChatScreen";
import ForgotPassword from "@modules/auth/ForgotPassword";
import VerifyOTP from "@modules/auth/VerifyOTP";
import ChangePasswordScreen from "@modules/app/settings/ChangePasswordScreen";

enableScreens();

const Stack = createStackNavigator<RootStackParams>();

const StackNavigation = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{ ...ScreenOptions, headerTintColor: theme.primary }}
    >
      <>
        <Stack.Screen
          name={Routes.Home}
          component={BottomNavigation}
          options={{
            gestureEnabled: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={Routes.Login}
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.Register}
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.ForgotPassword}
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.verifyOTP}
          component={VerifyOTP}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.ChangePasswordScreen}
          component={ChangePasswordScreen}
        />
        <Stack.Screen
          name={Routes.OneStepScreen}
          component={OneStepScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={Routes.ProfileStack}
          component={ProfileStack}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={Routes.MissionDaily}
          component={MissionDaily}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={Routes.ChatBot}
          component={ChatScreen}
          options={{ headerShown: false }}
        />
      </>
    </Stack.Navigator>
  );
};

function RootNavigation() {
  const userColorScheme = useAppSelector((s) => s?.AppReducer?.userColorScheme);
  const theme = useTheme();
  const isDarkTheme = userColorScheme === "dark";

  const navigationTheme = {
    dark: isDarkTheme,
    colors: {
      primary: theme.primary,
      background: theme.background,
      card: theme.card,
      text: theme.text,
      border: theme.border,
      notification: theme.notification,
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <StackNavigation />
        <Toast />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default RootNavigation;
