import { Image, StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React, { useEffect } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import Colors from "../Config/Colors";

const Profile = ({ style, username, email, imageUrl, onSelectImage }) => {
  const resultPermission = async () => {
    const result = await ImagePicker.requestCameraPermissionsAsync();
    if (!result.granted) {
      alert("You need to enable permission to access the library");
    }
  };

  useEffect(() => {
    resultPermission();
  }, []);

  const onPickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.5,
      });

      if (!result.canceled) {
        onSelectImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error reading image", error);
    }
  };

  const handleChange = () => {
    if (!imageUrl) onPickImage();
    else {
      Alert.alert("Delete", "Are you sure you want to remove this image", [
        { text: "Yes", onPress: () => onSelectImage(null) },
        { text: "No" },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleChange}>
          <View style={[styles.profile, style]}>
            {!imageUrl && (
              <Ionicons name="person" size={30} color={Colors.primary} />
            )}
            {imageUrl && (
              <Image source={{ uri: imageUrl }} style={styles.image} />
            )}
          </View>
        <View style={styles.camera}>
          <MaterialCommunityIcons
            name="camera-plus"
            size={15}
            color={Colors.white}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 70
  },
  profile: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: Colors.back,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  camera: {
    position: "absolute",
    top: 15,
    left: 75,
    backgroundColor: Colors.secondary,
    padding: 10,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
