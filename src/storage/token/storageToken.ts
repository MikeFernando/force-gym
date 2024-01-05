import AsyncStorage from "@react-native-async-storage/async-storage";

import { TOKEN_STORAGE_KEY } from "@storage/storageConfig";

type TokenStorageProps = {
  token: string;
  refresh_token: string;
};

export async function storageSaveToken({
  token,
  refresh_token,
}: TokenStorageProps) {
  await AsyncStorage.setItem(
    TOKEN_STORAGE_KEY,
    JSON.stringify({ token, refresh_token })
  );
}

export async function storageGetToken() {
  const response = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

  const { token, refresh_token }: TokenStorageProps = response
    ? JSON.parse(response)
    : {};

  return { token, refresh_token };
}

export async function storageDeleteToken() {
  return await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
}
