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

export async function storageUserGet() {
  try {
    const storage = await AsyncStorage.getItem(USER_STORAGE_KEY)

    const user: UserDTO = storage ? JSON.parse(storage) : {}
    
    return user
  } catch (error) {
    throw error
  }
}

export async function storageUserRemove() {
  try {
    await AsyncStorage.removeItem(USER_STORAGE_KEY)
  } catch (error) {
    throw error
  }
}