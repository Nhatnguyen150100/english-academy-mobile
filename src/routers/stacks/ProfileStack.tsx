import useTheme from "@hooks/useTheme";
import EditInformation from "@modules/app/profile/edit-info/EditInformation";
import HistoryExam from "@modules/app/profile/HistoryExam";
import Profile from "@modules/app/profile/Profile";
import { createStackNavigator } from "@react-navigation/stack";
import Routes, { RootStackParams } from "@utils/Routes";
import { ScreenOptions } from "@utils/ScreenOptions";
import React from "react";

const Stack = createStackNavigator<RootStackParams>();

export default function ProfileStack() {
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

        <Stack.Screen
          name={Routes.EditProfile}
          component={EditInformation}
        />
        <Stack.Screen
          name={Routes.HistoryExam}
          component={HistoryExam}
          options={{ headerShown: false }}
        />

      </>
    </Stack.Navigator>
  );
}
