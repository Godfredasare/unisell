import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";

import Back from "../../Components/Back";
import SafeView from "../../Components/SafeAreaView";
import DeleteAction from "../../Components/DeleteAction";
import MyPostList from "../../Components/MyPostList";
import favoriteContext from "../../hooks/favoriteContext";

const Width = Dimensions.get("window").width;

const FavoriteScreen = ({ navigation}) => {
const {isFavorite}  = useContext(favoriteContext);
  console.log(isFavorite);

  
  return (
    <SafeView>
      <View style={styles.top}>
        <Back onPress={() => navigation.navigate("profile")} />
        <Text style={styles.text}>Favorite</Text>
      </View>
     <FlatList 
       data={isFavorite}
       keyExtractor={({id}) => id}
       renderItem={({item}) =>(
        <MyPostList 
          title={item.title}
        />
       )}
     />
     
    </SafeView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#34baeb",
    width: Width,
  },
  text: {
    paddingHorizontal: 65,
    fontSize: 23,
    fontWeight: "600",
  },
});
