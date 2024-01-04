import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'

import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";

import defaultUserAvatar  from '@assets/userPhotoDefault.png'

import { UserPhoto } from "./UserPhoto";

export function Header() {
  const { user, signOut } = useAuth()

  return (
    <View className="bg-GRAY_600 pt-16 px-8 pb-6 flex-row items-center">
      <UserPhoto
        source={
          user.avatar 
            ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}`}
            : defaultUserAvatar
        }
        alt="Foto de perfil"
        size={56}
      />
      
      <View className="ml-4 flex-1">
        <Text className="text-GRAY_200 text-lg"> Olá,</Text>
        <Text className="text-WHITE text-lg font-bold ml-1">{user.name}</Text>
      </View>

      <TouchableOpacity onPress={signOut}>
        <MaterialIcons
          name="logout"
          color="#C4C4CC"
          size={26}
        />
      </TouchableOpacity>
    </View>
  )
}