import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import Colors from "../Config/Colors";

const ErrorMessage = ({name}) => {
  const {errors, touched} = useFormikContext()

  return (
    <View>
      {touched[name] && errors[name] && (
        <Text style={styles.error}>{errors[name]}</Text>
      )}
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
    error:{
        color: Colors.primary
    }
});
