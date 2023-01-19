import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Back from "../Components/Back";
import Search from "../Components/Search";
import Colors from "../Config/Colors";
import SafeView from "../Components/SafeAreaView";
import axios from "axios";
import SearchList from "../Components/SearchList";

const SearchScreen2 = ({ navigation }) => {
  const [List, setList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchAPI = async () => {
    try {
      const response = await axios.get(
        `https://unisell103.000webhostapp.com/search.php?searchInput=${searchInput}`
      );
      const result = response.data.srchpost;

      console.log(response.data.Message == 2);

      setList(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchInput) {
      searchAPI();
    }
  }, [searchInput]);

  return (
    <SafeView>
      <View style={styles.container}>
        <View style={styles.wrapSearch}>
          <Back color={Colors.primary} onPress={() => navigation.goBack()} />
          <Search
            value={searchInput}
            onChangeText={(e) => setSearchInput(e)}
            placeholder={"Search"}
            icon={"ios-search"}
          />
        </View>

        <View style={styles.list}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={List}
            keyExtractor={(item) => item.post_id}
            renderItem={({ item }) => (
              <SearchList
                imageUrl={item.images[0]}
                title={item.title}
                price={item.price}
                location={item.location}
                detail={item.description}
                onPress={() => {
                  navigation.navigate("Detail", item);
                }}
              />
            )}
          />
        </View>
      </View>
    </SafeView>
  );
};

export default SearchScreen2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f9f9",
    flex: 1,
  },
  wrapSearch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  list: {
    padding: 10,
    flex: 1,
  },
});
