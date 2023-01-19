import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import Back from "../../../App/Components/Back";
import SafeArea from "../../../App/Components/SafeAreaView";
import InputForm from "../../../App/Components/InputForm";
import Button from "../../../App/Components/Button";
import Colors from "../../../App/Config/Colors";
import ErrorMessage from "../../../App/Components/ErrorMessage";
import TokenContext from "../../hooks/TokenContext";

const emailSchema = Yup.object().shape({
  code: Yup.number().required("Required"),
});

const VerifyEmail = ({ navigation }) => {

  const {code, setUser} = useContext(TokenContext)
  console.log(code)

  return (
    <SafeArea style={styles.container}>
      <View style={styles.top}>
        <Back onPress={() => navigation.goBack()} />
        <Text style={styles.text}>Verify your code</Text>
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
        onSubmit={(values) => navigation.navigate("NewPassword")}
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
              style={{ paddingLeft: 50, alignSelf: 'center' }}
              size={"60%"}
            />
            <ErrorMessage name={"code"} />
            <Button title={"Verify"} onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </SafeArea>
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
  },
  forms: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});
