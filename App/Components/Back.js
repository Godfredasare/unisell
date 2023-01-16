import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../App/Config/Colors'

const Back = ({onPress, style, size=30}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Ionicons name="caret-back" size={size} color={Colors.primary} />
    </TouchableOpacity>
  );
};

export default Back;

const styles = StyleSheet.create({
    container:{
        width: 45,
        height: 45,
        borderRadius: 10,
        backgroundColor: Colors.back,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
