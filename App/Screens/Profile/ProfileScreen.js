import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";

import Colors from "../../Config/Colors";
import Back from "../../Components/Back";
import SafeView from "../../Components/SafeAreaView";
import Profile from "../../Components/ChoseImage";
import Icons from "../../Components/Icons";
import AuthContext from "../../hooks/Authcontex";
import AuthStorage from "../../Auth/AuthStorage";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const { user, setUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(user);

  console.log(image)

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const handleLogOut = () => {
    Alert.alert("Logout", "Are you sure you want to logout", [
      {
        text: "Yes",
        onPress: () => {
          setUser(null);
          AuthStorage.removeToken();
        },
      },
      { text: "No" },
    ]);
  };

  return (
    <SafeView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.cameraback}>
          <Back style={styles.back} onPress={() => navigation.goBack()} />
        </View>
        <Profile
          style={styles.profile}
          username={userData.username}
          email={userData.email}
          imageUrl={image}
          onSelectImage={setImage}
        />
      </View>

      <View style={styles.settings}>
        <Icons
          list={"My Post"}
          icon={"format-list-bulleted"}
          background={Colors.primary}
          iconColor={Colors.white}
          onPress={() => navigation.navigate("MyPost")}
        />

        <Icons
          list={"Favourite"}
          icon={"heart"}
          background={Colors.primary}
          iconColor={Colors.white}
          onPress={() => navigation.navigate("favourite")}
        />
        <View style={styles.line}></View>
        <Icons
          list={"About"}
          icon={"information-variant"}
          background={Colors.green}
          iconColor={Colors.white}
          onPress={() => navigation.navigate("about")}
        />

        <Icons
          list={"Logout"}
          icon={"lock"}
          background={Colors.green}
          iconColor={Colors.white}
          onPress={handleLogOut}
        />
      </View>
    </SafeView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E0E0E0",
    flex: 1,
  },
  profileContainer: {
    height: height * 0.35,
    padding: 15,
  },
  camera: {},
  profile: {
    padding: 30,
    alignSelf: "center",
  },
  back: {
    width: 41,
    height: 41,
    borderRadius: 7,
  },
  settings: {
    height: height * 0.65,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
    padding: 26,
  },
  line: {
    width: "100%",
    backgroundColor: "#e3dfda",
    height: 1.2,
    marginVertical: 10,
  },
});
