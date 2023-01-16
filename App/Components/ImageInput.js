import { StyleSheet, ScrollView, View } from "react-native";
import React, { useRef } from "react";
import Imagepicker from "./ImagePicker";

const ImageInput = ({ imageUris = [], onRemoveImage, onAddImage }) => {
  const scrollView = useRef();

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollView}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        {imageUris.map((uri) => (
          <View key={uri} style={styles.image}>
            <Imagepicker
              imageUri={uri}
              onSelectImage={() => onRemoveImage(uri)}
            />
          </View>
        ))}
        <Imagepicker onSelectImage={(uri) => onAddImage(uri)} />
      </ScrollView>
    </View>
  );
};

export default ImageInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
});
