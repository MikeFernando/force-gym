import { Text, View } from "react-native";
import { UserPhoto } from "./UserPhoto";

export function Header() {
  return (
      <View className="bg-GRAY_600 pt-16 px-8 pb-6 flex-row">
        <UserPhoto
          source={{ uri: 'https://github.com/MikeFernando.png' }}
          alt="Foto de perfil"
          size={56}
        />
        <View className="ml-4">
          <Text className="text-GRAY_200 text-xl">
            Olá,
          </Text>
          <Text className="text-white text-lg font-bold">
            Mike Fernando
          </Text>
        </View>
      </View>
  )
}