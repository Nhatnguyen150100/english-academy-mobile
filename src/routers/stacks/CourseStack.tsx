import useTheme from "@hooks/useTheme";
import CourseDetail from "@modules/app/courses/CourseDetail";
import Courses from "@modules/app/courses/Courses";
import Exam from "@modules/app/courses/Exam";
import UserProfile from "@modules/app/ranks/UserProfile";
import { createStackNavigator } from "@react-navigation/stack";
import Routes, { RootStackParams } from "@utils/Routes";
import { ScreenOptions } from "@utils/ScreenOptions";
import React from "react";

const Stack = createStackNavigator<RootStackParams>();

export default function CourseStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={Routes.Courses}
      screenOptions={{ ...ScreenOptions, headerTintColor: theme.primary }}
    >
      <>
        <Stack.Screen
          name={Routes.Courses}
          component={Courses}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={Routes.CourseDetail}
          component={CourseDetail}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={Routes.Exam}
          component={Exam}
          options={{ headerShown: false }}
        />

      </>
    </Stack.Navigator>
  );
}
