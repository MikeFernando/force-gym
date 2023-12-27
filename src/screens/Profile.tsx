import { ScrollView, Text, View } from "react-native";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";

export function Profile() {
  return (
      <View className="flex-1">
        <ScreenHeader title="Perfil" />

        <ScrollView>
          <View className="items-center justify-center mt-8">
            <UserPhoto 
              source={{ uri: "https://github.com/MikeFernando.png" }}
              alt="Foto de perfil"
              size={128}
            />
          </View>
        </ScrollView>
      </View>
  )
}