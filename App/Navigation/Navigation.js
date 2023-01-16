import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../Screens/Profile/ProfileScreen";
import MyPostScreen from "../Screens/Profile/MyPostScreen";
import FavoriteScreen from "../Screens/Profile/FavoriteScreen";
import AboutScreen from "../Screens/Profile/AboutScreen";
import AppNavigation from "./AppNavigation";
import ProductOverviewScreen from "../Screens/ProductOverviewScreen";
import SearchScreen2 from "../Screens/SearchScreen2";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="App" component={AppNavigation} />
      <Stack.Screen name="Detail" component={ProductOverviewScreen} />
      <Stack.Screen name="MyPost" component={MyPostScreen} />
      <Stack.Screen name="favourite" component={FavoriteScreen} />
      <Stack.Screen name="about" component={AboutScreen} />
      <Stack.Screen name="search" component={SearchScreen2} />
    </Stack.Navigator>
  );
};

export default Navigation;
