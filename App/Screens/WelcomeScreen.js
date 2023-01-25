import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import React from "react";

import Button from "../../App/Components/Button";

const image = require('../../assets/s4.jpg')


const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
       <View style={styles.logoContainer}>
        <Image source={require(`../../assets/logom.png`)} style={styles.logo}  />
      </View>

      <View style={styles.button}>
        <Button
          title={"Create new account"}
          onPress={() => navigation.navigate("Register")}
        />
        <Button
          title={"Login"}
          style={{ borderWidth: 1, backgroundColor: "#fff" }}
          colorText='secondary'
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </ImageBackground>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },

    logoContainer: {
    position: "absolute",
    top: 10,
    justifyContent: 'center'
  },
  logo: {
    width: 350,
    height: 180,
    alignSelf: "center",
  },

  button: {
    width: "100%",
    position: "absolute",
    top: 530,
    paddingLeft: 20,
    paddingRight: 20,
  },
});


export default WelcomeScreen;
