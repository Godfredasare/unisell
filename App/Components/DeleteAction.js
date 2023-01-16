import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../Config/Colors";
import { AntDesign } from "@expo/vector-icons";

const DeleteAction = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <AntDesign name="delete" size={30} color="black" />
    </TouchableOpacity>
  );
};

export default DeleteAction;

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        height: 158,
        width: 70,
        alignSelf: 'center',
        borderRadius: 10,
        marginRight: 20
    }
});
