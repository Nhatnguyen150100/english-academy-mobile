import useTheme from "@hooks/useTheme";
import BlogDetailScreen from "@modules/app/blogs/BlogDetailScreen";
import BlogListScreen from "@modules/app/blogs/BlogListScreen";
import CreateBlogScreen from "@modules/app/blogs/CreateBlogScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Routes, { BlogStackParams } from "@utils/Routes";
import { ScreenOptions } from "@utils/ScreenOptions";
import React from "react";

const Stack = createStackNavigator<BlogStackParams>();

export default function BlogStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={Routes.BlogList}
      screenOptions={{ ...ScreenOptions, headerTintColor: theme.primary }}
    >
      <>
        <Stack.Screen
          name={Routes.BlogList}
          component={BlogListScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={Routes.BlogDetail}
          component={BlogDetailScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={Routes.CreateBlog}
          component={CreateBlogScreen}
          options={{ headerShown: false }}
        />

      </>
    </Stack.Navigator>
  );
}
