import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useTheme } from "@src/hooks";
import ProfileStack from "./stack/ProfileStack";
import Courses from "@modules/app/Courses/Courses";
import Ranks from "@modules/app/Ranks/Ranks";
import Home from "@modules/app/home/Home";

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
        component={Ranks}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="barchart" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
