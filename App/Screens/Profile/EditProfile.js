import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Modal,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

import Colors from "../../Config/Colors";
import Button from "../../Components/Button";
import SafeView from "../../Components/SafeAreaView";
import Back from "../../Components/Back";
import ChoseImage from "../../Components/ChoseImage";
import axios from "axios";

const AppPicker = () => {
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const successTimeout = useRef(null);

  const hideSuccessAnimation = () => {
    setIsSuccess(false);
  };

  const postImage = async (imageUri) => {
    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      type: "image/jpeg",
      name: "image.jpg",
    });
    try {
      setLoading(true)
      const response = await axios.post(
        "https://unisell103.000webhostapp.com/profile.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data == 1) {
        setIsSuccess(true);
        successTimeout.current = setTimeout(hideSuccessAnimation, 3000);
        // resetForm();
      } else if (response.data == 2) {
        setLoading(false);
        alert("upload not sucessfully");
      }
    } catch (error) {
      console.error(error);
    }finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setVisible(true)}>
        <MaterialCommunityIcons
          name="account-edit"
          size={30}
          color={Colors.white}
        />
      </TouchableWithoutFeedback>
      <Modal
        visible={visible}
        animationType="slide"
        onRequestClose={() => setVisible(false)}
        style={styles.modal}
      >
         {loading && (
        <View style={styles.animations}>
          <LottieView
            source={require("../../../assets/animations/load2.json")}
            autoPlay
            loop
            style={{
              width: 200,
              height: 200,
            }}
          />
        </View>
      )}
      {isSuccess && (
        <View style={styles.animations}>
          <LottieView
            source={require("../../../assets/animations/done.json")}
            autoPlay
            loop={false}
            style={{
              width: 100,
              height: 100,
            }}
          />
        </View>
      )}
        <SafeView style={styles.container}>
          <View style={styles.wrapBack}>
            <Back onPress={() => setVisible(false)}></Back>
            <Text style={styles.ediText}>Edit Profile</Text>
          </View>
          <ChoseImage imageUrl={image} onSelectImage={setImage} />
          <Button
            title={"Save"}
            style={styles.save}
            onPress={() => {
              if (image) postImage(image);
              else Alert.alert("Error", "Please select an image first.");
            }}
          />
        </SafeView>
      </Modal>
    </>
  );
};

export default AppPicker;

const styles = StyleSheet.create({
  container: {
    paddingRight: 15,
    paddingLeft: 10,
  },
  wrapBack: {
    flexDirection: "row",
    alignItems: "center",
  },
  ediText: {
    fontSize: 20,
    fontWeight: "700",
    paddingLeft: 70,
  },
  save: {
    marginTop: 60,
  },
  animations: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
    opacity: 0.9,
    flex: 1,
  },
});
