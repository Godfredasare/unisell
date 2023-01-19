import {
  FlatList,
  StyleSheet,
  View,
  Pressable,
  Image,
  Text,
} from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import SafeView from "../Components/SafeAreaView";
import Colors from "../Config/Colors";
import PostItems from "../Components/PostItems";
import Button from "../Components/Button";
import Category from "../Components/Category";
import category from "../Data/category";
import axios from "axios";
import favoriteContext from "../hooks/favoriteContext";
import AuthContext from "../hooks/Authcontex";
import LottieView from "lottie-react-native";

const HomeScreen = ({ navigation }) => {
  const [label, setLabel] = useState("All");
  const [list, setList] = useState([]);
  const [isFavorite, setIsFavorite] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [noProducts, setNoProducts] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://unisell103.000webhostapp.com/get.php?label=${label}`
      );
      const result = response.data.users;
      setList(result);
      setIsLoading(false);
      if (response.data.Message == 2) {
        setNoProducts(true);
      } else {
        setNoProducts(false);
      }
    } catch (error) {
      if (error.message === "Network Error") {
        console.log("network error", error);
      }
      setError(true);
      console.error(error);
    } finally {
      setIsRefresh(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [label]);

  const handleCategory = (selectedLabel) => {
    setLabel(selectedLabel);
  };

  //Arranging products in alphabetical
  const handleOrderClick = () => {
    const newList = [...list];
    newList.sort((a, b) =>
      a.title > b.title ? 1 : b.title > a.title ? -1 : 0
    );
    setList(newList);
  };

  //scroll to top
  const [showButton, setShowButton] = useState(false);

  const flatListRef = useRef(null);

  const handleScrollToTop = () => {
    flatListRef.current.scrollToIndex({ animated: true, index: 0 });
  };

  return (
    <favoriteContext.Provider value={{ isFavorite, setIsFavorite }}>
      <SafeView style={styles.container}>
        <>
          <View style={styles.wrap}>
            <Pressable
              onPress={() => navigation.navigate("search")}
              style={styles.wrapSearch}
            >
              <Text style={styles.searchText}> Search </Text>
              <Ionicons name={"ios-search"} size={24} color={"#626363"} />
            </Pressable>

            <Pressable style={styles.wrapSort} onPress={handleOrderClick}>
              <MaterialCommunityIcons
                name="order-alphabetical-ascending"
                size={24}
                color={Colors.white}
              />
            </Pressable>
          </View>
          <View>
            <Category
              label={label}
              setStatusFilter={handleCategory}
              items={category}
            />
          </View>

          <View style={styles.flatlist}>
            {isRefresh && (
              <View style={styles.refreshContainer}>
                <LottieView
                  source={require("../../assets/animations/load3.json")}
                  autoPlay
                  loop
                />
              </View>
            )}

            {noProducts && (
              <Text style={styles.noProductsText}>
                No products in this category.
              </Text>
            )}

            {isLoading ? (
              <View style={styles.load}>
                <LottieView
                  source={require("../../assets/animations/load3.json")}
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
                onScroll={(e) =>
                  setShowButton(e.nativeEvent.contentOffset.y > 200)
                }
                onRefresh={() => {
                  setIsRefresh(true);
                  fetchData();
                }}
                refreshing={isRefresh}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                ref={flatListRef}
                data={list}
                keyExtractor={(item) => item.post_id}
                renderItem={({ item }) => (
                  <PostItems
                    imageUrl={item.images[0]}
                    title={item.title}
                    price={item.price}
                    location={item.location}
                    detail={item.description}
                    onPress={() => {
                      navigation.navigate("Detail", item);
                    }}
                  />
                )}
              />
            )}
            {showButton && (
              <Pressable onPress={handleScrollToTop} style={styles.wrapfilter}>
                <MaterialCommunityIcons
                  name="chevron-up"
                  size={24}
                  color={Colors.white}
                />
              </Pressable>
            )}
          </View>
        </>
      </SafeView>
    </favoriteContext.Provider>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f9f9",
    flex: 1,
  },
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  wrapSearch: {
    backgroundColor: "#fff",
    width: "82%",
    alignItems: "center",
    borderRadius: 27,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#c8ccc8",
  },
  searchText: {
    fontSize: 18,
    color: "#626363",
  },
  wrapSort: {
    width: 45,
    height: 45,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapfilter: {
    width: 45,
    height: 45,
    backgroundColor: Colors.primary,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    position: "absolute",
    top: "90%",
    right: 25,
  },
  flatlist: {
    flex: 1,
    paddingTop: 2,
  },

  post: {
    marginVertical: 20,
  },

  noProductsText: {
    alignSelf: "center",
    fontSize: 18,
    color: "#666",
    paddingTop: 100,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
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
