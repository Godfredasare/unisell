import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import PostItemScreen from "../Screens/PostItemScreen";
import Colors from "../Config/Colors";
import ProfileScreen2 from "../Screens/Profile/ProfileScreen2";
import HomeScreen from "../Screens/HomeScreen";

const Tab = createBottomTabNavigator();

const AppNavigation = (route) => {
  return (
    <Tab.Navigator
      mode="modal"
      screenOptions={{
        useScrollToHideTabs: true,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          elecation: 1,
          height: 50,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ route }) => ({ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={32} />
          ),
        })}
      />
      <Tab.Screen
        name="Post"
        component={PostItemScreen}
        options={() => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-add-circle" size={32} color={color} />
          ),
        })}
      />

      <Tab.Screen
        name="profile"
        component={ProfileScreen2}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={32} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigation;
