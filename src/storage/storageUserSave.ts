import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDTO } from "@dtos/UserDTO";

import { USER_STORAGE_KEY } from "./storageConfig";

export async function storageUserSave(user: UserDTO) {
  try {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

  } catch (error) {
    throw error
  }
}