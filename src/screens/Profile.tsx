import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Toast from "react-native-root-toast";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as Yup from "yup";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import { useAuth } from "@hooks/useAuth";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";


type FormDataProps = {
  name: string;
  email: string;
  old_password: string;
  new_password: string;
  confirm_password: string;
};

const ProfileSchema = Yup.object({
  name: Yup.string().required("Informe o nome."),
  new_password: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 dígitos.")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: Yup.string()
    .nullable()
    .oneOf([Yup.ref("new_password")], "A confirmação de senha não confere.")
    .transform((value) => (!!value ? value : null))
    .when("new_password", {
      is: (Field: any) => Field,
      then: (schema) =>
        schema
          .nullable()
          .required("Informe a confirmação da senha.")
          .transform((value) => (!!value ? value : null)),
    }),
});

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [userPhoto, setUserPhoto] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6xSz0eMW7GmpKukczOHvPWWGDqaBCqWA-Mw&usqp=CAU"
  );

  const { user, updatingUserProfile } = useAuth();

  const {control, handleSubmit, formState: { errors }} = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver<any>(ProfileSchema),
  });

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo: any = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return Toast.show("Escolha uma imagem com até 5MB.", {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            backgroundColor: "#F75A68",
            textColor: "#ffffff",
          });
        }

        setUserPhoto(photoSelected.assets[0].uri);
      }
    } catch (error) {
      throw error;
    }
  }

  async function handleUpdateProfile({ name, old_password, new_password }: FormDataProps) {
    try {
      setIsUpdating(true)

      const userUpdated = user
      userUpdated.name = name
    
      await api.put('/users', {
        name: name,
        password: new_password,
        old_password
      })

      await updatingUserProfile(userUpdated)

      Toast.show('Perfil atualizado com sucesso!', {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: '#00B37E',
        textColor: '#ffffff'
      })

    } catch (error) {
      
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível atualizar dados.'

      Toast.show(title, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: '#F75A68',
        textColor: '#ffffff'
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <View className="flex-1">
      <ScreenHeader title="Perfil" />

      <ScrollView
        className="px-8"
        contentContainerStyle={{ paddingBottom: 56 }}
      >
        <View className="items-center justify-center mt-8">
          <UserPhoto
            source={{ uri: userPhoto }}
            alt="Foto de perfil"
            size={128}
          />
        </View>

        <TouchableOpacity onPress={handleUserPhotoSelect}>
          <Text className="text-BLUE_500 text-lg font-bold text-center mt-2 mb-8">
            Alterar foto
          </Text>
        </TouchableOpacity>

        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              className="bg-GRAY_600"
              placeholder="Nome"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <View className="bg-GRAY_600 w-full p-4 rounded opacity-60">
          <Text className="text-GRAY_300 text-base">{user.email}</Text>
        </View>

        <View>
          <Text className="text-WHITE text-base mb-3 mt-12 ml-2">
            Alterar senha
          </Text>

          <Controller
            name="old_password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                className="bg-GRAY_600"
                placeholder="Senha antiga"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.old_password?.message}
              />
            )}
          />

          <Controller
            name="new_password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                className="bg-GRAY_600"
                placeholder="Nova Senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.new_password?.message}
              />
            )}
          />

          <Controller
            name="confirm_password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                className="bg-GRAY_600"
                placeholder="Confirme a nova senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            className="mt-4"
            title="Atualizar"
            isLoading={isUpdating}
            variant="PRIMARY"
            onPress={handleSubmit(handleUpdateProfile)}
          />
        </View>
      </ScrollView>
    </View>
  );
}
