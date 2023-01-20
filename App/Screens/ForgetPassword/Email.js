import { StyleSheet, Text, View, Image, Keyboard, Alert } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import LottieView from "lottie-react-native";

import Back from "../../../App/Components/Back";
import SafeArea from "../../../App/Components/SafeAreaView";
import InputForm from "../../../App/Components/InputForm";
import Button from "../../../App/Components/Button";
import Colors from "../../../App/Config/Colors";
import ErrorMessage from "../../../App/Components/ErrorMessage";
import axios from "axios";

const emailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const Email = ({ navigation }) => {;
  const [loading, setLoading] = useState(false);


  const handleEmailVerification = async (values, { resetForm }) => {
    try {
      setLoading(true);
      Keyboard.dismiss();
      const response = await axios.post(
        `https://unisell103.000webhostapp.com/chkemail.php`,
        {
          email: values.email,
        }
      );
      console.log(response.data);
      if (response.data.Message == 1) {
        navigation.navigate('verify')
        resetForm();
      } else if (response.data.Message == 2) {
        setLoading(false);
        alert(
          "The email address you provided does not match any of our records. Please check the email address and try again or sign up for an account"
        );
        console.log("email dont in the system");
      } else {
        Alert.alert(
          "Error",
          "An error occurred. Please check your email address and try again"
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred. Please check your email address and try again"
      );
      console.log("error sending", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
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
      <SafeArea style={styles.container}>
          <View style={styles.top}>
            <Back onPress={() => navigation.goBack()} />
            <Text style={styles.text}>Forgot Password</Text>
          </View>
          <View style={styles.Pic}>
            <View style={styles.imageContainer}>
              <Image
                source={require(`../../../assets/forget.png`)}
                style={styles.image}
              />
            </View>
            <Text style={styles.text2}>
              Please Enter Your Email Address To Receive a Verifaction Code.
            </Text>
          </View>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={handleEmailVerification}
            validationSchema={emailSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.forms}>
                <InputForm
                  icon={"email"}
                  placeholder={"Email"}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                <ErrorMessage name={"email"} />
                <Button title={"Send"} onPress={handleSubmit} />
              </View>
            )}
          </Formik>

      </SafeArea>
    </>
  );
};

export default Email;

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
