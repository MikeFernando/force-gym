import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDTO } from "@dtos/UserDTO";

import { USER_STORAGE_KEY } from "@storage/storageConfig";

export async function saveUser(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

export async function getUser() {
  const storage = await AsyncStorage.getItem(USER_STORAGE_KEY)

  const user: UserDTO = storage ? JSON.parse(storage) : {}
  
  return user
}

export async function deleteUser() {
  await AsyncStorage.removeItem(USER_STORAGE_KEY)
}