import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@src/hooks";
import Home from "@modules/app/home/Home";
import Setting from "@modules/app/settings/Setting";
import RankStack from "./stacks/RankStack";
import CourseStack from "./stacks/CourseStack";
import BlogStack from "./stacks/BlogStack";
import Routes from "@utils/Routes";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarStyle: { backgroundColor: "#FFF" },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={Routes.Home}
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={Routes.CourseStack}
        component={CourseStack}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="book" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={Routes.BlogStack}
        component={BlogStack}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="form" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={Routes.RankStack}
        component={RankStack}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="barchart" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={Routes.Settings}
        component={Setting}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="setting" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
