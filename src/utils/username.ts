import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getUsername() {
  return await AsyncStorage.getItem("username");
}

export async function setUsername(username: string) {
  await AsyncStorage.setItem("username", username);
}
