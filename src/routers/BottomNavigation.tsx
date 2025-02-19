import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@src/hooks";
import Courses from "@modules/app/Courses/Courses";
import Ranks from "@modules/app/Ranks/Ranks";
import Home from "@modules/app/home/Home";
import Setting from "@modules/app/settings/Setting";
import RankStack from "./stacks/RankStack";

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
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Courses"
        component={Courses}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="book" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Blogs"
        component={Ranks}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="form" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Ranks"
        component={RankStack}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="barchart" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
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
