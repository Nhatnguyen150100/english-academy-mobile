import useTheme from "@hooks/useTheme";
import ChapterDetail from "@modules/app/courses/ChapterDetail";
import CourseDetail from "@modules/app/courses/CourseDetail";
import Courses from "@modules/app/courses/Courses";
import Exam from "@modules/app/courses/Exam";
import UserProfile from "@modules/app/ranks/UserProfile";
import { createStackNavigator } from "@react-navigation/stack";
import Routes, { CourseStackParams } from "@utils/Routes";
import { ScreenOptions } from "@utils/ScreenOptions";
import React from "react";

const Stack = createStackNavigator<CourseStackParams>();

export default function CourseStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={Routes.CourseList}
      screenOptions={{ ...ScreenOptions, headerTintColor: theme.primary }}
    >
      <>
        <Stack.Screen
          name={Routes.CourseList}
          component={Courses}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={Routes.CourseDetail}
          component={CourseDetail}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={Routes.ChapterDetail}
          component={ChapterDetail}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={Routes.Exam}
          component={Exam}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </>
    </Stack.Navigator>
  );
}
