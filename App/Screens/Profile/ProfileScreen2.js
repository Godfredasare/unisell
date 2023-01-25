import { Dimensions, StyleSheet, Text, View, Image, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import SafeView from "../../Components/SafeAreaView";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";


import AuthContext from "../../hooks/Authcontex";
import AuthStorage from "../../Auth/AuthStorage";
import Colors from "../../Config/Colors";
import Icons from "../../Components/Icons";
import EditProfile from './EditProfile'

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;


const ProfileScreen2 = ({ navigation}) => {
  const { user, setUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(user);
  const [imageUrl, setImageUrl] = useState(null);

const fetchImage = async () => {
  try {
    // Generate a timestamp to append to the image URL
    const timestamp = Date.now();
    // Append the timestamp to the image URL
    const imageUrl = `https://unisell103.000webhostapp.com/getpropic.php?t=${timestamp}`;
    const response = await axios.get(imageUrl, {
        headers: {
            'Cache-Control': 'no-cache'
        }
    });
     const result = response.data.imageUrl;
     setImageUrl(result)
  } catch (error) {
    console.log('Error fetching image: ', error);
  }
}


useEffect(() => {
  fetchImage();
}, []);


  useEffect(() => {
    setUserData(user);
  }, [user]);


  const logoutFromServer = async (logout) => {
    try {
      await axios.post("https://unisell103.000webhostapp.com/logout.php", {
        logout: logout
      });
    } catch (error) {
      console.error("Error logging out from server:", error);
    }
  }
  

  const handleLogOut = () => {
    Alert.alert("Logout", "Are you sure you want to logout", [
      {
        text: "Yes",
        onPress: () => {
          logoutFromServer();
          setUser(null);
          AuthStorage.removeToken();
        },
      },
      { text: "No" },
    ]);
  };


  return (
    <SafeView>
      <View style={styles.container}>
        <View style={styles.wrapColor}>
          <Text style={styles.profileText}>Profile</Text>
         <EditProfile />
        </View>

        <View style={styles.wrapProfile}>
          <View styls={styles.mainProfile}>
            <View style={styles.wrapImage}>
            {!imageUrl && (
              <Ionicons name="person" size={30} color={Colors.primary} />
            )}
            {imageUrl && (
              <Image source={{ uri: imageUrl }} style={styles.image} />
            )}
            </View>
            <Text style={styles.username}>{userData.username}</Text>
            <Text style={styles.email}>{userData.email}</Text>
          </View>
        </View>
        <View style={styles.general}>
          <Icons
            list={"My Post"}
            icon={"format-list-bulleted"}
            iconColor={Colors.primary}
            onPress={() => navigation.navigate("MyPost")}
          />

          <View style={styles.line}></View>
          <Icons
            list={"About"}
            icon={"information-variant"}
            iconColor={Colors.primary}
            onPress={() => navigation.navigate("about")}
          />
          <Icons
            list={"Logout"}
            icon={"logout"}
            iconColor={Colors.primary}
            onPress={handleLogOut}
          />
        </View>
      </View>
    </SafeView>
  );
};

export default ProfileScreen2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f9fa",
    flex: 1,
  },
  wrapColor: {
    backgroundColor: Colors.primary,
    width: Width,
    height: Height * 0.36,
    borderBottomRightRadius: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
  profileText: {
    fontSize: 25,
    fontWeight: "700",
    color: Colors.white,
  },
  wrapProfile: {
    backgroundColor: Colors.white,
    width: "83%",
    height: "40%",
    borderRadius: 15,
    marginHorizontal: 30,
    position: "absolute",
    top: 90,
    elevation: 10,
    shadowColor: "#10aaae",
    shadowRadius: 7,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 10 },
      alignItems: "center",
      // justifyContent: "center",
      paddingTop: 25
  },

  wrapImage:{
     height: 100,
     width: 100,
     borderRadius: 50,
     backgroundColor: '#f5d8cb',
     alignSelf: 'center',
     alignItems: "center",
     justifyContent: "center",
  },

  image:{
    height: 100,
    width: 100,
    borderRadius: 50,
  },

  username:{
     fontSize: 18,
     fontWeight: '700',
     alignSelf: 'center',
     paddingVertical: 5
  },
  email:{
     fontSize: 15,
     fontWeight: '600',
     color: '#c7c0bd',
     alignSelf: 'center'
  },

  general: {
    position: "relative",
    top: 120,
    padding: 30,
  },
});
