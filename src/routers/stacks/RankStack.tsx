import useTheme from "@hooks/useTheme";
import EditInformation from "@modules/app/profile/edit-info/EditInformation";
import Ranks from "@modules/app/ranks/Ranks";
import UserProfile from "@modules/app/ranks/UserProfile";
import { createStackNavigator } from "@react-navigation/stack";
import Routes, { RankStackParams, RootStackParams } from "@utils/Routes";
import { ScreenOptions } from "@utils/ScreenOptions";
import React from "react";

const Stack = createStackNavigator<RankStackParams>();

export default function RankStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={Routes.RankList}
      screenOptions={{ ...ScreenOptions, headerTintColor: theme.primary }}
    >
      <>
        <Stack.Screen
          name={Routes.RankList}
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
