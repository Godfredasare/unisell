import * as SecureStore from "expo-secure-store";

const key = "authToken";

const storeToken = async (authToken) => {
  try {
    const token = JSON.stringify(authToken);
    await SecureStore.setItemAsync(key, token);
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const getToken = async () => {
  try {
      // Retrieve the token from the SecureStore
      const token = await SecureStore.getItemAsync(key);
      // Convert the JSON encoded string to an object
      return JSON.parse(token);
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};


const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};

export default { getToken, removeToken, storeToken };
