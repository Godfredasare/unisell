import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../Config/Colors";

const PostIcon = ({ onPress }) => {
  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <MaterialCommunityIcons name="plus" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default PostIcon;

const styles = StyleSheet.create({
  main: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.white,
    bottom: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1
  },
  container: {
    backgroundColor: Colors.primary,
    width: 45,
    height: 45,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
