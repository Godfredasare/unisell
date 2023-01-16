import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import WelcomeScreen from "../Screens/WelcomeScreen";
import Email from "../Screens/ForgetPassword/Email";
import VerifyEmail from "../Screens/ForgetPassword/VerifyEmail";
import NewPassword from "../Screens/ForgetPassword/NewPassword";
import Updated from "../Screens/ForgetPassword/Updated";


const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal',

      }}
    >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="email" component={Email} />
        <Stack.Screen name="verify" component={VerifyEmail} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="Updated" component={Updated} />
      </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
