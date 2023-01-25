import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import LottieView from "lottie-react-native";
import axios from "axios";

import post from "../../Data/post";
import MyPostList from "../../Components/MyPostList";
import SafeArea from "../../Components/SafeAreaView";
import Back from "../../Components/Back";
import DeleteAction from "../../Components/DeleteAction";
import Colors from "../../Config/Colors";

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

const MyPostScreen = ({ navigation }) => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [noProducts, setNoProducts] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  const myPostApi = async () => {
    try {
      const response = await axios.get(
        "https://unisell103.000webhostapp.com/mypost.php"
      );
      const result = response.data.users;
      setListings(result);
      setIsLoading(false);
      
      if (response.data.Message == 2) {
        setNoProducts(true);
      }
    } catch (error) {
      setError(true);
      console.log(error);
      setError(true);
    } finally {
      setIsRefresh(false);
    }
  };

  useEffect(() => {
    myPostApi();
  }, []);

  const handleDelete = async (post_id) => {
    try {
      const response = await axios.post(
        "https://unisell103.000webhostapp.com/delete.php",
        {
          postid: post_id,
        }
      );
      console.log(response.data);
      if (response.data.Message == 1) {
        alert("Item deleted successfully");

        myPostApi();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeArea style={styles.container}>
      <View style={styles.top}>
        <Back onPress={() => navigation.goBack()} />
        <Text style={styles.text}>My Post</Text>
      </View>
      <View style={styles.post}>
        {isRefresh && (
          <LottieView
            source={require("../../../assets/animations/load3.json")}
            autoPlay
            loop
          />
        )}

        {noProducts && (
          <Text style={styles.noProductsText}>
            You haven't posted anything yet.
          </Text>
        )}

        {isLoading ? (
          <View style={styles.load}>
            <LottieView
              source={require("../../../assets/animations/load3.json")}
              autoPlay
              loop
              style={{
                width: 200,
                height: 200,
              }}
            />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Couldn't load listings</Text>
            <Button title="Try again" onPress={fetchData} />
          </View>
        ) : (
          <FlatList
            onRefresh={() => {
              setIsRefresh(true);
              myPostApi();
            }}
            refreshing={isRefresh}
            data={listings}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.post_id}
            renderItem={({ item }) => (
              <MyPostList
                imageUrl={item.images[0]}
                title={item.title}
                price={item.price}
                location={item.location}
                detail={item.detail}
                onPress={() => navigation.navigate("Detail", item)}
                renderRightActions={() => (
                  <DeleteAction onPress={() => handleDelete(item.post_id)} />
                )}
              />
            )}
          />
        )}
      </View>
    </SafeArea>
  );
};

export default MyPostScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f9f9",

  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: Width,
  },
  text: {
    paddingHorizontal: 65,
    fontSize: 23,
    fontWeight: "600",
  },
  post: {
    // height: Height * 0.65,
    // backgroundColor: Colors.white,
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // elevation: 10,
    padding: 5,
    flex: 1,
  },
  noProductsText: {
    alignSelf: "center",
    fontSize: 18,
    color: "#666",
    paddingTop: 100,
  },
  load: {
    // flex: 1,
    backgroundColor: Colors.white,
    height: 100,
    width: 100,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    top: "40%",
    shadowColor: Colors.secondary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
