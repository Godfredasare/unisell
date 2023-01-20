import { StyleSheet, Text, View, Image, Alert, Keyboard } from "react-native";
import React, { useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import LottieView from "lottie-react-native";

import Back from "../../../App/Components/Back";
import SafeArea from "../../../App/Components/SafeAreaView";
import InputForm from "../../../App/Components/InputForm";
import Button from "../../../App/Components/Button";
import Colors from "../../../App/Config/Colors";
import ErrorMessage from "../../../App/Components/ErrorMessage";

const emailSchema = Yup.object().shape({
  code: Yup.number().required("Please enter your verification code"),
});

const VerifyEmail = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const successTimeOut = useRef(null);

  const hideSuccessAnimation = () => {
    setSuccess(false);
  };

  const verifyApi = async (values, { resetForm }) => {
    try {
      setIsLoading(true);
      Keyboard.dismiss()
      const response = await axios.post(
        `https://unisell103.000webhostapp.com/ver.php`,
        {
          code: values.code,
        }
      );
      if (response.data.Message == 1) {
        setSuccess(true);
        successTimeOut.current = setTimeout(hideSuccessAnimation, 3000);
        successTimeOut.current = setTimeout(() =>{

          navigation.navigate("NewPassword");
        }, 2600);
        resetForm();
      } else if (response.data.Message == 2) {
        setIsLoading(false);
        alert(
          "Incorrect verification code. Please check your email and try again"
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred. Please check your email address and try again"
      );
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
      {success && (
        <View style={styles.animations}>
          <LottieView
            source={require("../../../assets/animations/done.json")}
            autoPlay
            loop={false}
            style={{
              width: 200,
              height: 200,
            }}
          />
        </View>
      )}
      <SafeArea style={styles.container}>
        <View style={styles.top}>
          <Back onPress={() => navigation.goBack()} />
          <Text style={styles.text}>Verify Your Email</Text>
        </View>
        <View style={styles.Pic}>
          <View style={styles.imageContainer}>
            <Image
              source={require(`../../../assets/verify.png`)}
              style={styles.image}
            />
          </View>
          <Text style={styles.text2}>
            Please Enter the 6 digit code sent to yourmail@gmail.com
          </Text>
        </View>
        <Formik
          initialValues={{ code: "" }}
          onSubmit={verifyApi}
          validationSchema={emailSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.forms}>
              <InputForm
                // icon={"lock"}
                placeholder={"code"}
                autoCorrect={false}
                keyboardType="numeric"
                maxLength={6}
                onChangeText={handleChange("code")}
                onBlur={handleBlur("code")}
                value={values.code}
                style={{ paddingLeft: 50, alignSelf: "center" }}
                size={"60%"}
              />
              <ErrorMessage name={"code"} />
              <Button title={"Verify"} onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      </SafeArea>
    </>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5
  },
  text: {
    paddingHorizontal: 49,
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
    padding: 9,
    textAlign: "center",
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
