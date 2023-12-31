import { useNavigation } from "@react-navigation/native"
import { ScrollView, Text, View } from "react-native"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { Image } from "react-native"
import * as y from 'yup'

import { api } from '@services/api'

import { AuthNavigatorRoutesProps } from "@routes/AuthRoutes"

import Background from '@assets/background.png'
import Logo from '@assets/logo.png'

import { Button } from "@components/Button"
import { Input } from "@components/Input"

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
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(SignUpSchema)
  })

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.navigate("signIn")
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    const response = await api.post('/users', { name, email, password })
    
    console.log(response.data);
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