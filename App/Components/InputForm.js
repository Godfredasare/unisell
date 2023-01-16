import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from "../Config/Colors";

const InputForm = ({placeholder, icon,style,size='100%', ...otherProps}) => {
  return (
    <View style={[styles.container, style, {width: size}]}>
      <MaterialCommunityIcons name={icon} size={24} color={'#e6ac97'} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        {...otherProps}
      />
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.forms,
        alignItems: "center",
        borderRadius: 27,
        padding: 13,
        marginVertical: 5,
        flexDirection: 'row',
        marginVertical: 10,
     },
    
    input:{
        paddingHorizontal: 5,
        fontSize: 18,
        width: '90%'
      }
});
