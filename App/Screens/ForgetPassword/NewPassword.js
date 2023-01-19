import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import Back from "../../../App/Components/Back";
import InputPassword from "../../../App/Components/InputPassword";
import Button from "../../../App/Components/Button";
import Colors from "../../../App/Config/Colors";
import ErrorMessage from "../../../App/Components/ErrorMessage";

const NewPassSchema = Yup.object().shape({
  password: Yup.string()
    .required("please enter your password")
    .min(6, "Password must be 6 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], 'Must match "password" field value'),
});

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.container}>
        <View style={styles.top}>
          <Back />
          <Text style={styles.text}>Forget Password</Text>
        </View>
        <View style={styles.Pic}>
          <View style={styles.imageContainer}>
            <Image
              source={require(`../../../assets/new.png`)}
              style={styles.image}
            />
          </View>
          <Text style={styles.text2}>
            Your New Password Must be Different From Previosly Used Password.
          </Text>
        </View>
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          onSubmit={(values) => console.log(values)}
          validationSchema={NewPassSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.forms}>
              <InputPassword
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                style={{ flex: 1 }}
                icon="lock"
                placeholder="New Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              <ErrorMessage name={"password"} />

              <InputPassword
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                style={{ flex: 1 }}
                icon="lock"
                placeholder="Comfirm Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
              />
              <ErrorMessage name={"confirmPassword"} />
              <Button title={"Send"} onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    backgroundColor: Colors.white,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  text: {
    paddingHorizontal: 65,
    fontSize: 23,
    fontWeight: "600",
  },
  Pic: {
    padding: 30,
    alignitems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    alignSelf: "center",
    backgroundColor: Colors.forget,
    borderRadius: 90,
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  text2: {
    fontSize: 18,
    fontWeight: "600",
    margin: 9,
    textAlign: "center",
  },
  forms: {
    padding: 20,
  },
});
