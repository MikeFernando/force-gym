import AsyncStorage from "@react-native-async-storage/async-storage"

import { TOKEN_STORAGE_KEY } from "@storage/storageConfig"

export async function saveToken(token: string) {
  await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token)
}

export async function getToken() {
  return await AsyncStorage.getItem(TOKEN_STORAGE_KEY)
}

export async function deleteToken() {
  return await AsyncStorage.removeItem(TOKEN_STORAGE_KEY)
}