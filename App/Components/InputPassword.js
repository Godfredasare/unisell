import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from "../Config/Colors";

const Inputpassword = ({placeholder, setShowPassword, showPassword, ...otherProps}) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={'lock'} size={24} color={'#e6ac97'} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        {...otherProps}
      />
       <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Ionicons name={showPassword ? 'ios-eye' : 'ios-eye-off'} size={24} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default Inputpassword;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.forms,
        alignItems: "center",
        justifyContent: 'space-between',
        borderRadius: 27,
        padding: 13,
        marginVertical: 5,
        flexDirection: 'row',
        marginVertical: 10,
        width: '100%'
     },
    
    input:{
        paddingHorizontal: 5,
        fontSize: 18
      }
});
