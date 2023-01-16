import { Modal, StyleSheet, View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";
import Colors from "../Config/Colors";

const PostSucess = ({onDone, progress = 0, visible = false}) => {
  return (
    <Modal visible={visible}>
    <View style={styles.container}>
      {progress < 1 ? (
        <Progress.Bar
          color={Colors.primary}
          progress={progress}
          width={200}
        />
      ) : (
        <LottieView
          autoPlay
          loop={false}
          onAnimationFinish={onDone}
          source={require("../../assets/animations/success2.json")}
          style={styles.animation}
        />
      )}
    </View>
  </Modal>
  );
};

export default PostSucess;

const styles = StyleSheet.create({
    animation: {
    width: 150,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
