import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  return (
      <View className="flex-1">
        <ScreenHeader title="Perfil" />

        <ScrollView className="px-8" contentContainerStyle={{ paddingBottom: 56 }}>
          <View className="items-center justify-center mt-8">
            {photoIsLoading ? (
              <View  className="w-32 h-32 rounded-full bg-GRAY_500"/>
            ) : (
              <UserPhoto 
                source={{ uri: "https://github.com/MikeFernando.png" }}
                alt="Foto de perfil"
                size={128}
              />
            )}
          </View>

          <TouchableOpacity>
            <Text className="text-BLUE_500 text-lg font-bold text-center mt-2 mb-8">
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input className="bg-GRAY_600"
            placeholder="Nome"
          />

          <View className="bg-GRAY_600 w-full p-4 rounded opacity-60">
            <Text className="text-GRAY_300 text-base">jonDoe@exemple.com</Text>
          </View>

          <View>
            <Text className="text-WHITE text-base mb-3 mt-12 ml-2">
              Alterar senha
            </Text>

            <Input className="bg-GRAY_600"
              placeholder="Senha antiga"
              secureTextEntry
            />
             <Input className="bg-GRAY_600"
              placeholder="Nova senha"
              secureTextEntry
            />

            <Input className="bg-GRAY_600"
              placeholder="Confirme a nova senha"
              secureTextEntry
            />

            <Button
              className="mt-4" 
              title="Atualizar"
              variant="PRIMARY"
            />
          </View>
        </ScrollView>
      </View>
  )
}