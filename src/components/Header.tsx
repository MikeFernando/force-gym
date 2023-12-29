import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'

import { UserPhoto } from "./UserPhoto";

export function Header() {
  return (
    <View className="bg-GRAY_600 pt-16 px-8 pb-6 flex-row items-center">
      <UserPhoto
        source={{ uri: 'https://github.com/MikeFernando.png' }}
        alt="Foto de perfil"
        size={56}
      />
      
      <View className="ml-4 flex-1">
        <Text className="text-GRAY_200 text-xl"> Olá,</Text>
        <Text className="text-WHITE text-lg font-bold">Mike Fernando</Text>
      </View>

      <TouchableOpacity>
        <MaterialIcons
          name="logout"
          color="#C4C4CC"
          size={26}
        />
      </TouchableOpacity>
    </View>
  )
}