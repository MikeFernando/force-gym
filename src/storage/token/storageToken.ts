import AsyncStorage from "@react-native-async-storage/async-storage"

import { TOKEN_STORAGE_KEY } from "@storage/storageConfig"

export async function storageSaveToken(token: string) {
  await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token)
}

export async function storageGetToken() {
  return await AsyncStorage.getItem(TOKEN_STORAGE_KEY)
}

export async function storageDeleteToken() {
  return await AsyncStorage.removeItem(TOKEN_STORAGE_KEY)
}