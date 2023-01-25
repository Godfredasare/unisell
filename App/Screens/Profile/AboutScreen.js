import React from "react";
import { StyleSheet, Text, View, Image, Linking, ScrollView } from "react-native";

import Back from "../../Components/Back";
import SafeView from "../../Components/SafeAreaView";
import Contacts from "../../Components/Contacts";


const AboutScreen = ({ navigation }) => {
  return (
    <SafeView
    style={styles.container}>
      <View style={styles.top}>
        <Back onPress={() => navigation.navigate("profile")} />
        <Text style={styles.text}>About</Text>
      </View>
      <ScrollView
      showsVerticalScrollIndicator={false}
      
      >
        <View style={styles.wrap}>
        <Image style={styles.logo} source={require("../../../assets/logom.png")} />
        <Text style={styles.appVersion}>Version 1.0.0</Text>
        <Text style={styles.appDescription}>
          UniSell is an online marketplace app that allows users to buy and sell
          products with one another. With UniSell, you can quickly and easily
          create listings for the products you want to sell, and browse listings
          posted by other users to find items you're interested in purchasing.
        </Text>
        <Text style={styles.appDescription}>
          To use UniSell, you can simply download the app from the play store
          and create an account. Once you're logged in, you can start creating
          listings for the products you want to sell. Just take a few photos,
          write a description, and set a price. Your listing will then be
          available for other users to see and potentially purchase.
        </Text>
        <Text style={styles.appDescription}>
          If you're looking to buy something, you can use the app to search for
          specific items or browse through different categories. Once you find
          something you like, you can easily communicate with the seller and
          make a purchase.
        </Text>
        <Text style={styles.appDescription}>
          Overall, UniSell is a convenient and easy-to-use app that makes it
          simple to buy and sell products with others across the country. Give
          it a try and see how it can help you find exactly what you're looking
          for.
        </Text>


        </View >

        <Text style={styles.us}>
          Contact Us
        </Text>
        <View style={styles.contact}>
        <Contacts
            contact={"Chat"}
            contactIcon={"whatsapp"}
            onPress={() => Linking.openURL('whatsapp://send?text=Hello&phone=' + '233'+ '0594822630')}
            />
        <Contacts
            contact={"Chat"}
            contactIcon={"phone-alt"}
            onPress={() => Linking.openURL('tel:' + '0594822630')}
            />
        <Contacts
            contact={"Chat"}
            contactIcon={"telegram-plane"}
            onPress={() => Linking.openURL('https://t.me/UniSell123')}
            color='telegram'
            />
        </View>
      </ScrollView>

    </SafeView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    paddingHorizontal: 65,
    fontSize: 23,
    fontWeight: "600",
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  appName: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  appVersion: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  appDescription: {
    textAlign: "center",
    margin: 10,
    textAlign: 'auto'
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  us:{
    textAlign: "center",
    margin: 10,
    fontSize: 15,
    fontWeight: '600'
  }
});
