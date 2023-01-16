import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../Config/Colors";

const HomeProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.name}>
        <View style={styles.hello}>
          <Text style={styles.text1}>Hello,</Text>
          <Text style={styles.text2}>Lydia!</Text>
        </View>
        <Text style={styles.text3}>Welcome</Text>
      </View>
      <Image
        source={require("../../assets/images/stories5.jpg")}
        style={styles.image}
      />
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    height: 45,
    width: 45,
    borderRadius: 23,
  },
  hello: {
    flexDirection: "row",
    alignItems: "center",
  },
  text1: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.secondary,
  },
  text2: {
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 5,
    color: Colors.primary,
  },
  text3: {
    fontSize: 16,
    fontWeight: "600",
    color: "#948f85",
  },
});
