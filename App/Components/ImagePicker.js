import { Alert, Image, Pressable, StyleSheet, View } from "react-native";
import React, { useEffect} from "react";
import * as ImagePicker from "expo-image-picker";
import { Foundation } from "@expo/vector-icons";

import Colors from "../Config/Colors";

const Imagepicker = ({ imageUri, onSelectImage }) => {

  const resultPermission = async () => {
    const result = await ImagePicker.requestCameraPermissionsAsync();
    if (!result.granted) {
      alert("You need to enable permission to acess the library");
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
        allowsMultipleSelection: true,

      });
      if (!result.canceled) {
        result.assets.forEach((asset) => {
          onSelectImage(asset.uri);
        });
      }
    } catch (error) {
      console.log("Error reading image", error);
    }
  };

  const handleChange = () => {
    if (!imageUri) onPickImage();
    else {
      Alert.alert("Delete", "Are you sure you want to remove this image", [
        { text: "Yes", onPress: () => onSelectImage(null) },
        { text: "No" },
      ]);
    }
  };

  return (
    <View>
      <Pressable style={styles.container} onPress={handleChange}>
        {!imageUri && (
          <Foundation name="camera" size={30} color={'#e6ac97'} />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </Pressable>
    </View>
  );
};

export default Imagepicker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.forms,
    width: 100,
    height: 100,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
  },
});
