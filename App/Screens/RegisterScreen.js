import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import React, { useState, useRef } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";

import InputForm from "../../App/Components/InputForm";
import SafeView from "../../App/Components/SafeAreaView";
import Button from "../../App/Components/Button";
import ErrorMessage from "../Components/ErrorMessage";
import Inputpassword from "../Components/InputPassword";
import Colors from "../Config/Colors";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("please enter your password")
    .min(6, "Password must be 6 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter"),
});

const RegisterScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const successTimeout = useRef(null);

  const hideSuccessAnimation = () => {
    setIsSuccess(false);
  };
  const hideUsernameAnimation = () => {
    setEmailError("");
  };

  const handleRegister = async (values, { setSubmitting, resetForm }) => {
    try {
      Keyboard.dismiss();
      setLoading(true);
      // Make the signup request using Axios
      const response = await axios.post(
        "https://unisell103.000webhostapp.com/register.php",
        {
          username: values.username,
          email: values.email,
          password: values.password,
        }
      );

      if (response.data.Message == 1) {
        setIsSuccess(true);
        successTimeout.current = setTimeout(hideSuccessAnimation, 3800);
        successTimeout.current = setTimeout(() => {
          // navigate to the login screen after 3 seconds
          navigation.navigate("Login");
        }, 3000);
        resetForm();
      } else if (response.data.Message == 0) {
        setEmailError("Email already in use");
        successTimeout.current = setTimeout(hideUsernameAnimation, 5000);
      } else {
        Alert.alert("Error", "An error occurred while registering");
      }

    } catch (error) {
      if (error.message === "Network Error") {
        Alert.alert(
          "Error",
          "There was a network error. Please try again later."
        );
      } else {
        // Handle any other errors
        Alert.alert("Error", "An error occurred while registering");
      }
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      {loading && (
        <View style={styles.animations}>
          <LottieView
            source={require("../../assets/animations/load2.json")}
            autoPlay
            loop
            style={{
              width: 200,
              height: 200,
            }}
          />
        </View>
      )}
      {isSuccess && (
        <View style={styles.animations}>
          <LottieView
            source={require("../../assets/animations/done.json")}
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
        <View>
          <View style={styles.logoContainer}>
            <Image
              source={require(`../../assets/logom.png`)}
              style={styles.logo}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Create new account</Text>
          </View>

          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            onSubmit={handleRegister}
            validationSchema={RegisterSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.forms}>
                {emailError && (
                  <Text style={{ color: Colors.primary }}>{emailError}</Text>
                )}
                <InputForm
                  style={{ flex: 1 }}
                  icon={"account"}
                  placeholder={"Username"}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
                <ErrorMessage name={"username"} />

                <InputForm
                  style={{ flex: 1 }}
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

                <Inputpassword
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  style={{ flex: 1 }}
                  icon="lock"
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={!showPassword}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                <ErrorMessage name={"password"} />

                <Button
                  title={"Register"}
                  onPress={handleSubmit}
                  isSubmitting={false}
                />
                <View style={styles.bottom}>
                  <Text style={styles.txt1}>Aready have an account?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.txt2}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </SafeView>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#fff",
  },

  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 200,
  },
  textContainer: {
    position: "absolute",
    top: 150,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
  forms: {
    position: "absolute",
    width: "100%",
    top: 210,
  },
  bottom: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  txt1: {
    fontsize: 18,
    paddingHorizontal: 5,
  },
  txt2: {
    fontsize: 18,
    color: Colors.primary,
  },
  showHide: {
    position: "absolute",
    top: 175,
    right: 10,
  },
  animations: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    // top: 200,
    zIndex: 1,
    width: "100%",
    height: "100%",
    opacity: 0.9,
    flex: 1,
  },
});
