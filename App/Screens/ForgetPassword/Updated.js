import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import Back from "../../Components/Back";
import Button from "../../Components/Button";
import Colors from '../../../App/Config/Colors'

const Updated = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Back onPress={() => navigation.goBack()} />
        <Text style={styles.text}>Reset password</Text>
      </View>
      <View style={styles.Pic}>
        <Image
          source={require(`../../../assets/update.png`)}
          style={styles.image}
        />
        <Text style={styles.text2}>Password Updated</Text>
        <Text style={styles.text3}>Your Password has been updated.</Text>
      </View>
      <View style={styles.button}>
        <Button title={"Login"}  onPress={() => navigation.navigate('Login')}/>
      </View>
    </View>
  );
};

export default Updated;

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
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
  image: {
    width: 220,
    height: 200,
    alignSelf: 'center'
  },
  text2: {
    fontSize: 20,
    fontWeight: "600",
    margin: 10,
    textAlign: 'center'
  },
  text3:{
     color: Colors.price,
     fontSize: 17,
     textAlign: 'center'
  },
  button: {
    padding: 20,
  },
});
