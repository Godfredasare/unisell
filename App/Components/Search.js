import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { Ionicons } from '@expo/vector-icons';

import Colors from "../Config/Colors";

const Search = ({placeholder, icon,style, ...otherProps}) => {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name={icon} size={24} color={'#626363'} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        {...otherProps}
        placeholderTextColor={'#626363'}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: "82%",
        alignItems: "center",
        borderRadius: 27,
        padding: 10,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: "#c8ccc8",
     },
    
    input:{
        paddingHorizontal: 5,
        fontSize: 18
      }
});
