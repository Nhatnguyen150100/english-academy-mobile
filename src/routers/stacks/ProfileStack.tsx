import useTheme from "@hooks/useTheme";
import Profile from "@modules/app/profile/Profile";
import { createStackNavigator } from "@react-navigation/stack";
import Routes, { RootStackParams } from "@utils/Routes";
import { ScreenOptions } from "@utils/ScreenOptions";
import React from "react";

type Props = {};
const Stack = createStackNavigator<RootStackParams>();

export default function ProfileStack({}: Props) {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={Routes.Profile}
      screenOptions={{ ...ScreenOptions, headerTintColor: theme.primary }}
    >
      <>
        <Stack.Screen
          name={Routes.Profile}
          component={Profile}
          options={{ headerShown: false }}
        />
      </>
    </Stack.Navigator>
  );
}
