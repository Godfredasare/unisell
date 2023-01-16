import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../Config/Colors";

const Icons = ({ icon, iconColor, list, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.Iconcontainer}>
        <View style={styles.Icon}>
          <MaterialCommunityIcons name={icon} size={24} color={iconColor} />
        </View>
        <Text style={styles.text}>{list}</Text>
      </View>
      <MaterialCommunityIcons
        name={"chevron-right"}
        size={33}
        color={"black"}
      />
    </Pressable>
  );
};

export default Icons;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    padding: 7,
    borderRadius: 15,
  },
  Iconcontainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  Icon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#f5d8cb'
  },
  text: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 15,
  },
});
