import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../Config/Colors";

const PickerIcons = ({ background, icon, onPress, list, borderRadius=40 }) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={[styles.Icon, { backgroundColor: background }]}>
          <MaterialCommunityIcons name={icon} size={40} color={'#fff'} />
        </TouchableOpacity>
        <Text style={styles.text}>{list}</Text>
    </View>
  );
};

export default PickerIcons;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    width: '35%'
  },
  Icon: {
    width: 75,
    height: 75,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: "700",
    textAlign: 'center',
    marginTop: 5
  },
});
