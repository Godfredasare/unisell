import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import Back from "../../../App/Components/Back";
import SafeArea from "../../../App/Components/SafeAreaView";
import InputForm from "../../../App/Components/InputForm";
import Button from "../../../App/Components/Button";
import Colors from "../../../App/Config/Colors";
import ErrorMessage from "../../../App/Components/ErrorMessage";

const emailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const Email = ({navigation}) => {
  return (
    <SafeArea>

    <View style={styles.container}>
      <View style={styles.top}>
        <Back onPress={() => navigation.goBack()} />
        <Text style={styles.text}>Forget Password</Text>
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
        onSubmit={(values) => console.log(values)}
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
    </View>
    </SafeArea>
  );
};

export default Email;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1
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
    padding: 9,
    textAlign: "center",
  },
  forms: {
    padding: 20,
  },
});
