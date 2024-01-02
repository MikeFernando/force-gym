import { useNavigation } from "@react-navigation/native"
import { ScrollView, Text, View } from "react-native"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import Toast from "react-native-root-toast";
import { Image } from "react-native"
import { useState } from "react";
import * as y from 'yup'

import { AuthNavigatorRoutesProps } from "@routes/AuthRoutes"

import { api } from '@services/api'
import { AppError } from "@utils/AppError"

import Background from '@assets/background.png'
import Logo from '@assets/logo.png'

import { Button } from "@components/Button"
import { Input } from "@components/Input"
import { useAuth } from "@hooks/useAuth";

type FormDataProps = {
  name: string
  email: string
  password: string
}

const SignUpSchema = y.object({
  name: y.string().required('Nome obrigatório.'),
  email: y.string().required('E-mail obrigatório.').email('E-mail inválido.'),
  password: y.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
})

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(SignUpSchema)
  })

  const { signIn } = useAuth()

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.navigate("signIn")
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      setIsLoading(true)

      await api.post('/users', { name, email, password })
      await signIn(email, password)

    } catch (error) {
      setIsLoading(false)
      
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Erro no servidor, Tente novamente mais tarde!'

      Toast.show(title, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: '#F75A68',
        textColor: '#ffffff'
      })
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 items-center relative px-8">
        <Image className="relative"
          source={Background}
          defaultSource={Background}
          alt="Pessoas treinando"
          resizeMode="contain"
        />

        <View className="items-center w-full justify-center absolute">
          <Image source={Logo} />

          <Text className="text-WHITE font-bold text-xl text-center mb-20">
            Crie sua conta
          </Text>

          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                autoCapitalize="none"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
                returnKeyType="send"
                onSubmitEditing={() => handleSubmit(handleSignUp)}
              />
            )}
          />

          <Button className="mt-10"
            isLoading={isLoading}
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
          />
          <Button className="mt-5"
            variant="SECONDARY"
            title="Voltar para o login"
            onPress={handleGoBack}
          />
        </View>
      </View>
    </ScrollView>
  )
}