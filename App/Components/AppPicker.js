import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../Config/Colors";
import Button from "./Button";
import PickerIcons from "./PickerIcon";
import SafeView from "./SafeAreaView";

const AppPicker = ({ items, selectItem, onSelectItem, placeholder }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setVisible(true)}>
        <View style={styles.container}>
          <View style={styles.apps}>
            <MaterialCommunityIcons
              name={"apps"}
              color={'#e6ac97'}
              size={24}
            />
            <Text style={styles.text}>{selectItem ? selectItem.label : placeholder}</Text>
           
          </View>
          <MaterialCommunityIcons
            name="chevron-down"
            size={26}
            color={Colors.primary}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={visible} animationType='slide'  onRequestClose={() => setVisible(false)}>
        <SafeView>
          <Button title="Close" onPress={() => setVisible(false)} />
          <FlatList
            data={items}
            keyExtractor={({ id }) => id}
            numColumns={2}
            renderItem={({ item }) => (
              <PickerIcons
                list={item.label}
                icon={item.icon}
                background={item.background}
                onPress={() => {
                  setVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </SafeView>
      </Modal>
    </>
  );
};

export default AppPicker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.forms,
    width: "100%",
    alignItems: "center",
    borderRadius: 27,
    padding: 13,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 18,
    paddingHorizontal: 5,
    color: Colors.price,
  },
  apps: {
    flexDirection: "row",
  },
});
