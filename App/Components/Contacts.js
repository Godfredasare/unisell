import { StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import { FontA, FontAwesome5 } from '@expo/vector-icons';
import Colors from "../Config/Colors";

const Contacts = ({ contactIcon, onPress, color='green'}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, {backgroundColor: Colors[color]}]}>
      <FontAwesome5 name={contactIcon} size={25} color="white" />
    </TouchableOpacity>
  );
};

export default Contacts;

const styles = StyleSheet.create({
    container:{
        borderRadius: 16,
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
