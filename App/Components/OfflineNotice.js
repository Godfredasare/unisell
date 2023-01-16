import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import Constants  from "expo-constants";

import Colors from '../Config/Colors'

const OfflineNotice = () => {
    const netInfo = useNetInfo();

    if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
      return (
        <View style={styles.container}>
          <Text style={styles.text}>No Internet Connection</Text>
        </View>
      );
  
    return null;
  }


export default OfflineNotice;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        alignItems: 'center',
        // justifyContent: 'center',
        height: 50,
        width: '100%',
        zIndex: 1,
        // position: 'absolute',
        top: Constants.statusBarHeight,
    },
    text: {
        color: Colors.white,
        alignSelf: 'center'
    }
});
