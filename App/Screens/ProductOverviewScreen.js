import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import * as Linking from "expo-linking";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

import Colors from "../Config/Colors";
import Back from "../Components/Back";
import Contacts from "../Components/Contacts";
import SafeView from "../Components/SafeAreaView";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ProductOverviewScreen = ({ navigation, route, imageUri }) => {
  const Post = route.params;

  const [liked, setLiked] = useState();
  const [imgActive, setImgActive] = useState(0);

  // const downloadImage = async (imageUrl) => {
  //   try {
  //     const response = await fetch(imageUrl);
  //     const file = await response.blob();
  //     const result = await ImagePicker.saveToLibraryAsync(file);
  //     console.log('Image saved to', result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleClicked = () => {
    setLiked(!liked);
  };

  // image slide
  const onChange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide != imgActive) {
        setImgActive(slide);
      }
    }
  };

  // contact
  const handlePressTele = () => {
    Linking.openURL("tel:" + Post.tele);
  };

  const handlePressWhatsapp = () => {
    Linking.openURL(
      "whatsapp://send?text=Hello, I am interested in your product&phone=" +
        "+233" +
        Post.tele
    );
  };

  return (
    <SafeView>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.image}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={({ nativeEvent }) => onChange(nativeEvent)}
              style={styles.image}
            >
              {Post.images.map((e, index) => (
                <View styles={styles.image} key={e} >
                  <Image
                    style={styles.image}
                    source={{ uri: e }}
                    resizeMode="stretch"
                  />
                  {/* <TouchableOpacity
                    style={styles.downloadIcon}
                    onPress={() => downloadImage(e)}
                  >
                    <Ionicons name="ios-download" size={30} color="#fff" />
                  </TouchableOpacity> */}
                </View>
              ))}
            </ScrollView>
            <View style={styles.dot}>
              {Post.images.map((e, index) => (
                <Text
                  key={e}
                  style={
                    imgActive == index ? styles.dotActive : styles.dotInActive
                  }
                >
                  ●
                </Text>
              ))}
            </View>
          </View>

          {/* <TouchableOpacity style={styles.fav} onPress={handleClicked}>
            {liked ? (
              <MaterialCommunityIcons
                name="heart"
                size={20}
                color={Colors.primary}
                style={styles.heart}
              />
            ) : (
              <MaterialCommunityIcons
                name="heart-outline"
                size={20}
                color="black"
                style={styles.heart}
              />
            )}
          </TouchableOpacity> */}

          <View style={styles.backContainer}>
            <Back
              size={25}
              color={Colors.primary}
              style={styles.back}
              onPress={() => navigation.goBack()}
            />
          </View>

          <View style={styles.detailContainer}>
            <View style={styles.titlePrice}>
              <Text ellipsizeMode="tail" numberOfLines={3} style={styles.title}>
                {Post.title}
              </Text>
            </View>

            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={17} color={"#d1cfcd"} />
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.location}
              >
                {Post.location}
              </Text>
            </View>
            <Text style={styles.price}>{"GH₵" + Post.price}</Text>

            <View style={styles.line}></View>
            <View style={styles.seller}>
              <View style={styles.wrapTextImage}>
                <View style={styles.wrapImage}>
                  <View style={styles.wrapImage2}>
                    {imageUri ? (
                      <Image
                        source={{ uri: imageUri }}
                        style={styles.SellerImage}
                      />
                    ) : (
                      <Ionicons
                        name="person"
                        size={10}
                        color={Colors.secondary}
                      />
                    )}
                  </View>
                </View>
                <Text style={styles.name} numberOfLines={1}>
                  KwesiKay ggetde dvdg
                </Text>
              </View>
              <View style={styles.contact}>
                <Contacts
                  contactIcon={"logo-whatsapp"}
                  onPress={handlePressWhatsapp}
                />
                <Contacts
                  contactIcon={"call-outline"}
                  onPress={handlePressTele}
                />
              </View>
            </View>
            <View style={styles.line}></View>

            <View style={styles.mainDetail}>
              <Text style={styles.detail1}>Product Description</Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={20}
                style={styles.detail}
              >
                {Post.description}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  wrapImage:{
    height: height * 0.5,
    width: width,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: height * 0.45,
    width: width,
  },
  dot: {
    position: "absolute",
    top: "90%",
    botoom: 0,
    flexDirection: "row",
    alignSelf: "center",
  },
  dotActive: {
    color: "black",
    margin: 3,
  },
  dotInActive: {
    color: Colors.back,
    margin: 3,
  },
  backContainer: {
    position: "absolute",
    top: 27,
    left: 14,
  },
  back: {
    width: 40,
    height: 40,
  },
  fav: {
    position: "absolute",
    left: 290,
    top: 30,
  },
  heart: {
    backgroundColor: Colors.white,
    borderRadius: 25,
    padding: 12,
  },
  detailContainer: {
    padding: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.primary,
    fontFamily: "Roboto",
    paddingVertical: 5,
  },
  title: {
    fontSize: 21,
    fontWeight: "600",
    color: Colors.secondary,
    width: "100%",
    fontFamily: "Roboto",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    color: "#d1cfcd",
    fontWeight: "700",
    width: "100%",
    paddingVertical: 5
  },

  mainDetail: {
    paddingVertical: 13,
  },
  detail1: {
    color: "#4e4f52",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  detail: {
    color: "#a3a09d",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto",
    textAlign: "auto",
  },

  contact: {
    flexDirection: "row",
    alignItems: "center",
  },

  line: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.back,
    marginVertical: 5,
  },
  seller: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wrapTextImage: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrapImage: {
    width: 55,
    height: 55,
    borderRadius: 35,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapImage2: {
    backgroundColor: Colors.back,
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 30,
  },
  SellerImage: {
    width: 48,
    height: 48,
    borderRadius: 30,
  },
  name: {
    fontSize: 18,
    paddingLeft: 5,
    width: "50%",
  },
  downloadIcon: {
    position: "absolute",
    right: 20,
    top: 20,
  },
});
