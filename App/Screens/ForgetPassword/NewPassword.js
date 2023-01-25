import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import LottieView from 'lottie-react-native'

import Back from "../../../App/Components/Back";
import InputPassword from "../../../App/Components/InputPassword";
import Button from "../../../App/Components/Button";
import Colors from "../../../App/Config/Colors";
import ErrorMessage from "../../../App/Components/ErrorMessage";
import SafeView from "../../../App/Components/SafeAreaView";

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

const NewPassword = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordT, setShowPasswordT] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const passwordApi = async(values) => {
    try {
      setIsLoading(true)
      const response = await axios.post('https://unisell103.000webhostapp.com/upswd.php', {
        password: values.password
      })
      console.log(response.data)
      if (response.data.Message == 1){
        navigation.navigate('Updated')
      }
      if (response.data.Message == 2){
        setIsLoading(false)
        alert('not success')
      }
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <>
     {isLoading && (
        <View style={styles.animations}>
          <LottieView
            source={require("../../../assets/animations/load2.json")}
            autoPlay
            loop
            style={{
              width: 200,
              height: 200,
            }}
          />
        </View>
      )}
      <SafeView style={styles.container}>
        <View style={styles.top}>
          <Back onPress={() => navigation.goBack()}/>
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
          onSubmit={passwordApi}
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
                secureTextEntry={!showPassword}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              <ErrorMessage name={"password"} />

              <InputPassword
                showPassword={showPasswordT}
                setShowPassword={setShowPasswordT}
                style={{ flex: 1 }}
                icon="lock"
                placeholder="Comfirm Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={!showPasswordT}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
              />
              <ErrorMessage name={"confirmPassword"} />
              <Button title={"Send"} onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      </SafeView>
    </>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5
  },
  text: {
    paddingHorizontal: 52,
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
    width: 130,
    height: 130,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 90,
    height: 90,
  },
  text2: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    padding: 9,
    color: Colors.price
  },
  forms: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  animations: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
    opacity: 0.9,
    flex: 1,
  },
});
