import { ScrollView, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from "react-hook-form"
import { Image } from "react-native"
import { useState } from "react"
import * as y from 'yup'

import { AppError } from "@utils/AppError"

import { AuthNavigatorRoutesProps } from "@routes/AuthRoutes"
import { useAuth } from "@hooks/useAuth"

import Background from '@assets/background.png'
import Logo from '@assets/logo.png'

import { Button } from "@components/Button"
import { Input } from "@components/Input"
import Toast from "react-native-root-toast"

type FormData = {
  email: string
  password: string
}

const SignInSchema = y.object({
  email: y.string().required('E-mail obrigatório.').email('E-mail inválido.'),
  password: y.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
})

export function SignIn() 
{
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(SignInSchema)
  })

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNewAccount() {
    navigation.navigate("signUp")
  }
  
  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true)
      await signIn(email, password)

    } catch (error) {

      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Tente novamente mais tarde!'

      setIsLoading(false)

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
        <Image
          source={Background}
          defaultSource={Background}
          alt="Pessoas treinando"
          resizeMode="contain"
        />

        <View className="items-center w-full justify-center absolute top-16">
          <Image className="-translate-y-14" source={Logo} />

          <Text className="text-WHITE font-bold text-xl text-center mb-5">
            Acesse sua conta
          </Text>

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
                returnKeyType="send"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
                onSubmitEditing={handleSubmit(handleSignIn)}
              />
            )}
          />

          <Button className="mt-1" 
            title="Acessar"
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />

          <Text className="text-base text-WHITE mt-10 mb-2">
            Ainda não tem acesso?
          </Text>

          <Button className="mb-24"
            title="Criar conta"
            variant="SECONDARY"
            onPress={handleNewAccount}
          />
        </View>
      </View>
    </ScrollView>
  )
}