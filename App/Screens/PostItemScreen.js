import {
  Keyboard,
  View,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import React, { useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import LottieView from "lottie-react-native";

import AppPicker from "../Components/AppPicker";
import Colors from "../Config/Colors";
import ErrorMessage from "../Components/ErrorMessage";
import Button from "../../App/Components/Button";
import InputForm from "../../App/Components/InputForm";
import ImageFormPicker from "../../App/Components/ImageFormPicker";
import SafeView from "../Components/SafeAreaView";

const categories = [
  {
    label: "Electronics",
    id: 1,
    icon: "cellphone-link",
    background: Colors.primary,
  },
  {
    label: "Fashion",
    id: 2,
    icon: "account-tie",
    background: Colors.secondary,
  },
  { label: "Laptops", id: 3, icon: "laptop", background: "#39fa5a" },
  {
    label: " Mobile Phones",
    id: 4,
    icon: "tablet-cellphone",
    background: "#39cafa",
  },
  { label: "Others", id: 2, icon: "apps", background: "#faed39" },
];

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  location: Yup.string().required().label("Location"),
  price: Yup.number().required().min(1).max(100000).label("Price"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array()
    .of(Yup.string())
    .min(4, "Select 4 pictures")
    .max(4, "Only 4 pictures allowed"),
});

const PostItemScreen = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const successTimeout = useRef(null);

  const hideSuccessAnimation = () => {
    setIsSuccess(false);
  };

  const handlePost = async (values, { resetForm, setSubmitting }) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("location", values.location);
    formData.append("price", values.price);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("description", values.description);
    formData.append("category", values.category.label);

    //posting multiple images
    values.images.map((image, index) =>
      formData.append("images[]", {
        name: image,
        type: "image/jpeg",
        uri: image,
      })
    );

    try {
      Keyboard.dismiss();
      setLoading(true);
      const response = await axios.post(
        "https://unisell103.000webhostapp.com/post.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data)
      if (response.data == 1) {
        setIsSuccess(true);
        successTimeout.current = setTimeout(hideSuccessAnimation, 3000);
        resetForm();
      } else if (response.data == 2) {
        setLoading(false);
        alert("upload not sucessfully");
      }
    } catch (error) {
      if (error.message === "Network Error") {
        Alert.alert(
          "Error",
          "There was a network error. Please try again later."
        );
      } else {
        // Handle any other errors
        Alert.alert("Error", "An error occurred while posting listings");
      }
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      {loading && (
        <View style={styles.animations}>
          <LottieView
            source={require("../../assets/animations/load2.json")}
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
            source={require("../../assets/animations/success2.json")}
            autoPlay
            loop={false}
            style={{
              width: 200,
              height: 200,
            }}
          />
        </View>
      )}
      <SafeView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={{
              title: "",
              price: "",
              phoneNumber: "",
              description: "",
              location: "",
              category: null,
              images: [],
            }}
            onSubmit={handlePost}
            validationSchema={validationSchema}
          >
            {({
              handleSubmit,
              setFieldValue,
              setFieldTouched,
              values,
            }) => (
              <>
                <Text style={styles.text}>Post Listings</Text>

                <ImageFormPicker name={"images"} />
                <InputForm
                  placeholder="Title"
                  icon={"subtitles"}
                  maxLength={255}
                  onChangeText={(text) => setFieldValue("title", text)}
                  value={values.title}
                  onBlur={() => setFieldTouched("title")}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <ErrorMessage name="title" />
                <InputForm
                  placeholder="Price"
                  icon={"cash"}
                  maxLength={8}
                  keyboardType="number-pad"
                  onChangeText={(text) => setFieldValue("price", text)}
                  value={values.price}
                  onBlur={() => setFieldTouched("price")}
                  size={"50%"}
                />
                <ErrorMessage name="price" />
                <AppPicker
                  items={categories}
                  placeholder="Category"
                  selectItem={values.category}
                  onSelectItem={(item) => setFieldValue("category", item)}
                />
                <ErrorMessage name="category" />
                <InputForm
                  placeholder="Tele"
                  icon={"phone"}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="phone-pad"
                  onChangeText={(text) => setFieldValue("phoneNumber", text)}
                  value={values.phoneNumber}
                  onBlur={() => setFieldTouched("phoneNumber")}
                />
                <ErrorMessage name="phoneNumber" />
                <InputForm
                  placeholder="Location"
                  icon={"cash"}
                  keyboardType="default"
                  onChangeText={(text) => setFieldValue("location", text)}
                  value={values.location}
                  onBlur={() => setFieldTouched("location")}
                />

                <ErrorMessage name="location" />

                <InputForm
                  placeholder="Description"
                  icon={"text-long"}
                  maxLength={255}
                  multiline
                  numberOfLines={2}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(text) => setFieldValue("description", text)}
                  value={values.description}
                  onBlur={() => setFieldTouched("description")}
                />
                <ErrorMessage name="description" />
                <Button title="Post" onPress={handleSubmit} />
              </>
            )}
          </Formik>
        </ScrollView>
      </SafeView>
    </>
  );
};

export default PostItemScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.white,
    flex: 1,
  },
  text: {
    fontSize: 23,
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 5,
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
