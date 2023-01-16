import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import LottieView from "lottie-react-native";

import InputForm from "../../App/Components/InputForm";
import SafeView from "../../App/Components/SafeAreaView";
import Button from "../../App/Components/Button";
import Colors from "../Config/Colors";
import ErrorMessage from "../Components/ErrorMessage";
import Inputpassword from "../Components/InputPassword";
import AuthContext from "../hooks/Authcontex";
import AuthStorage from "../Auth/AuthStorage";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Please enter your email"),
  password: Yup.string().required("Please enter your password"),
});

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [userError, setUserError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const refTimeOut = useRef(null);

  const { setUser } = useContext(AuthContext);

  const hideUserError = () => {
    setUserError("");
  };

  const handleLogin = async (values, { resetForm, setSubmitting }) => {
    try {
      Keyboard.dismiss();
      setIsLoading(true);
      const response = await axios.post(
        "https://unisell103.000webhostapp.com/login.php",
        {
          email: values.email,
          password: values.password,
        }
      );
      if (response.data.Message == 1) {
        AuthStorage.storeToken(response.data.users);
        const user = AuthStorage.getToken();
        setUser(user);
        resetForm();
      } else if (response.data.Message == 2) {
        setUserError("Invalid email and/or password");
        refTimeOut.current = setTimeout(hideUserError, 5000);
      } else {
        Alert.alert("Error", "An error occurred while logging in");
      }
    } catch (error) {
      console.log(error);
      if (error.message === "Network Error") {
        Alert.alert(
          "Error",
          "There was a network error. Please try again later."
        );
      } else {
        Alert.alert("Error", "An error occurred while logging in");
        console.log("error", error);
      }
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      {isLoading && (
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
      <SafeView style={styles.container}>
        <View>
          <View style={styles.logoContainer}>
            <Image
              source={require(`../../assets/logo.png`)}
              style={styles.logo}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Login to your account</Text>
          </View>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleLogin}
            validationSchema={LoginSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View style={styles.forms}>
                {userError && (
                  <Text style={{ color: Colors.primary }}>{userError}</Text>
                )}
                <InputForm
                  style={{ flex: 1 }}
                  icon={"account"}
                  placeholder={"Email"}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
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
                <TouchableOpacity
                  style={styles.forgetContainer}
                  onPress={() => navigation.navigate("email")}
                >
                  <Text style={styles.forget}>Forget Password?</Text>
                </TouchableOpacity>

                <Button title={"Login"} onPress={handleSubmit} />

                <View style={styles.bottom}>
                  <Text style={styles.txt1}>Don't have an account?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text style={styles.txt2}>Register</Text>
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

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
  },

  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 150,
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
  forgetContainer: {
    position: "relative",
    left: 200,
  },
  forget: {
    color: Colors.primary,
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
