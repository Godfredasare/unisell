import { StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import { Ionicons } from '@expo/vector-icons';
import Colors from "../Config/Colors";

const Contacts = ({ contactIcon, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container]}>
      <Ionicons name={contactIcon} size={25} color="white" />
    </TouchableOpacity>
  );
};

export default Contacts;

const styles = StyleSheet.create({
    container:{
        borderRadius: 16,
        backgroundColor: Colors.green,
        alignItems: 'center',
        justifyContent: 'center',
         height: 50,
         width: 50,
         marginHorizontal: 5
    },
    text:{
        fontSize: 20,
        color: Colors.white,
        fontWeight: '600'
    }
});
