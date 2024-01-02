import AsyncStorage from "@react-native-async-storage/async-storage";

import { USER_STORAGE_KEY } from "./storageConfig";

export async function storageUserGet() {
  try {
    const storage = await AsyncStorage.getItem(USER_STORAGE_KEY)

    const user = storage ? JSON.parse(storage) : {}
    
    return user
  } catch (error) {
    throw error
  }
}