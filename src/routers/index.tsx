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
import { getStoreStringAsync, removeStoreDataAsync } from "@helpers/storage";
import { StoreEnum } from "@helpers/storage/storeEnum";
import { authService } from "@src/services";
import { useDispatch } from "react-redux";
import { setUser } from "@store/redux/appSlice";
import LoadingScreen from "@components/base/LoadingScreen";
import Profile from "@modules/app/profile/Profile";
import ProfileStack from "./stacks/ProfileStack";
import MissionDaily from "@modules/app/mission-daily/MissionDaily";

enableScreens();

const Stack = createStackNavigator<RootStackParams>();

const StackNavigation = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const handleGetInfo = async () => {
    try {
      const rs = await authService.getInfo();
      if (!rs.data) {
        await removeStoreDataAsync(StoreEnum.AccessToken);
        setIsSignedIn(false);
      } else {
        dispatch(setUser(rs.data));
        setIsSignedIn(true);
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const checkSignInStatus = async () => {
      const token = await getStoreStringAsync(StoreEnum.AccessToken);
      if (token) {
        setIsSignedIn(true);
        await handleGetInfo();
      } else {
        setIsSignedIn(false);
        setLoading(false);
      }
    };

    checkSignInStatus();
  }, [dispatch]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName={isSignedIn ? Routes.Home : Routes.OneStepScreen}
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
          name={Routes.OneStepScreen}
          component={OneStepScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={Routes.Profile}
          component={ProfileStack}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={Routes.MissionDaily}
          component={MissionDaily}
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
