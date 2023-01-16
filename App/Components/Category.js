import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../Config/Colors";
import {  MaterialCommunityIcons } from "@expo/vector-icons";

const Category = ({items, setStatusFilter, label, onLabel, icons}) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.wrap}>
        {items.map((text) => (
          <TouchableOpacity
            style={[
              styles.category,
              label === text.label && styles.btnTabActive,
            ]}
            key={text.id}
            onPress={() => setStatusFilter(text.label)}
          >
            <MaterialCommunityIcons
              name={text.icons}
              size={24}
              style={[
                styles.categoryIcon,
                label === text.label && styles.activeIcon,
              ]}
            />
            <Text
              style={[
                styles.cateText,
                label === text.label && styles.textActive,
              ]}
            >
              {text.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
  );
};

export default Category;

const styles = StyleSheet.create({
  wrap: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5
  },
    category: {
        marginHorizontal: 3,
        backgroundColor: Colors.white,
        borderRadius: 19,
        padding: 6,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
      },
      cateText: {
        paddingHorizontal: 10,
        fontSize: 17,
        fontWeight: "600",
        color: "#948f85",
      },
      btnTabActive: {
        backgroundColor: Colors.primary,
      },
      textActive: {
        color: Colors.white,
      },
      activeIcon: {
        color: Colors.white,
      },
      categoryIcon: {
        color: "#948f85",
      },
      post: {
        marginVertical: 20,
      },
});
