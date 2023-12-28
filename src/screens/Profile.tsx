import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from 'expo-file-system';
import Toast from "react-native-root-toast";
import { useState } from "react";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://scontent-gru2-1.xx.fbcdn.net/v/t39.30808-6/407567327_1107784840209001_8925044900244978296_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=k8jy_k2o8uEAX9EX-_W&_nc_ht=scontent-gru2-1.xx&oh=00_AfBIVm8X05sBFpUx3Z87z6pETahl0N4la71cJusKAqzWHg&oe=6591BF47')

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true)
    
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })
  
      if (photoSelected.canceled) {
        return
      }
  
      if (photoSelected.assets[0].uri) {
        const photoInfo: any = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)
        
        if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 1) {
          return Toast.show('Escolha uma imagem com até 5MB.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            backgroundColor: '#F75A68',
            textColor: '#ffffff',
          })
        }

        setUserPhoto(photoSelected.assets[0].uri) 
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false)
    }
  } 

  return (
      <View className="flex-1">
        <ScreenHeader title="Perfil" />

        <ScrollView className="px-8" contentContainerStyle={{ paddingBottom: 56 }}>
          <View className="items-center justify-center mt-8">
            {photoIsLoading ? (
              <View  className="w-32 h-32 rounded-full bg-GRAY_500"/>
            ) : (
              <UserPhoto 
                source={{ uri: `${userPhoto}` }}
                alt="Foto de perfil"
                size={128}
              />
            )}
          </View>

          <TouchableOpacity onPress={handleUserPhotoSelect}>
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