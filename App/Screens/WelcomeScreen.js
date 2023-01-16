import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import Button from "../../App/Components/Button";
import Colors from "../Config/Colors";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require(`../../assets/logo.png`)} style={styles.logo} />
      </View>

      <View style={styles.welcome}>
        <Image
          source={require(`../../assets/welcome.png`)}
          style={styles.image}
        />
        <Text style={styles.text}>Sell What You Don`t Want</Text>
      </View>
      <View style={styles.button}>
        <Button
          title={"Create new account"}
          onPress={() => navigation.navigate("Register")}
        />
        <Button
          color={"secondary"}
          title={"Login"}
          style={{ borderWidth: 1, backgroundColor: "#fff" }}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 12,
    backgroundColor: Colors.background,
  },
  logoContainer: {
    position: "relative",
    bottom: 35,
  },
  logo: {
    width: 230,
    height: 160,
    alignSelf: "center",
  },
  welcome: {
    position: "absolute",
    top: 150,
    alignItems: "center",
  },
  image: {
    width: 330,
    height: 250,
  },
  text: {
    fontWeight: "600",
    fontSize: 23,
  },
  button: {
    width: "100%",
    position: "absolute",
    top: 530,
  },
});

export default WelcomeScreen;
