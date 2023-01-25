import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Pressable,
  } from "react-native";
  import { MaterialIcons} from "@expo/vector-icons";
  
  import Colors from "../Config/Colors";
  
  
  const SearchList = ({
    title,
    detail,
    location,
    price,
    imageUrl,
    onPress,
  }) => {
  
  
  
    return (
      <Pressable onPress={onPress} style={styles.wrap}>
        <View style={styles.container}>
          <Image source={{uri: imageUrl}} style={styles.image} resizeMode={'contain'} />
        
          <View style={styles.textContainer}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
              {title}
            </Text>
            <Text ellipsizeMode="tail" numberOfLines={2} style={styles.detail}>
              {detail}
            </Text>
  
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={17} color={"#d1cfcd"} />
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.location}
              >
                {location}
              </Text>
            </View>
            <Text style={styles.price} ellipsizeMode="tail" numberOfLines={1}>
              {"GH₵" + price}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };
  
  export default SearchList;
  
  const styles = StyleSheet.create({
    wrap: {
      paddingLeft: 15,
      paddingRight: 15,
      flex: 1
    },
    container: {
      width: "100%",
      height: 158,
      borderRadius: 22,
      flexDirection: "row",
      backgroundColor: "#fff",
      padding: 7,
      marginVertical: 10,
      elevation: 10,
      shadowColor: "#10aaae",
      shadowRadius: 7,
      shadowOpacity: 0.5,
      shadowOffset: { width: 0, height: 10 },
    },
    image: {
      width: "45%",
      height: "100%",
      borderRadius: 15,
    },
    textContainer: {
      padding: 6,
      width: "55%",
    },
    price: {
      fontSize: 17,
      fontWeight: "700",
      color: Colors.secondary,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: Colors.secondary,
    },
    detail: {
      color: "#948f8b",
      fontSize: 15,
      paddingVertical: 5,
    },
    locationContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 5,
    },
    location: {
      color: "#d1cfcd",
    },
  });
  