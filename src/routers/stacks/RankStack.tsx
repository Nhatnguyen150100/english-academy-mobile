import useTheme from "@hooks/useTheme";
import EditInformation from "@modules/app/profile/edit-info/EditInformation";
import Ranks from "@modules/app/Ranks/Ranks";
import UserProfile from "@modules/app/Ranks/UserProfile";
import { createStackNavigator } from "@react-navigation/stack";
import Routes, { RootStackParams } from "@utils/Routes";
import { ScreenOptions } from "@utils/ScreenOptions";
import React from "react";

const Stack = createStackNavigator<RootStackParams>();

export default function RankStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={Routes.Ranks}
      screenOptions={{ ...ScreenOptions, headerTintColor: theme.primary }}
    >
      <>
        <Stack.Screen
          name={Routes.Ranks}
          component={Ranks}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={Routes.UserProfile}
          component={UserProfile}
          options={{ headerShown: false }}
        />

      </>
    </Stack.Navigator>
  );
}
