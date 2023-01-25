import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import Colors from "../Config/Colors";

const Button = ({onPress, title, style, colorText='white'}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
    >
      <Text style={[styles.text, {color: Colors[colorText]}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    width: "100%",
    alignItems: "center",
    borderRadius: 27,
    padding: 13,
    marginVertical: 5,
  },
  text: {
    // color: Colors.white,
    fontWeight: "700",
    fontSize: 17,
  },
});
