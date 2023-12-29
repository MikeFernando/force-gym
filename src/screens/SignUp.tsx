import { useNavigation } from "@react-navigation/native"
import { ScrollView, Text, View } from "react-native"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { Image } from "react-native"
import * as y from 'yup'

import { AuthNavigatorRoutesProps } from "@routes/AuthRoutes"

import Background from '@assets/background.png'
import Logo from '@assets/logo.png'

import { Button } from "@components/Button"
import { Input } from "@components/Input"

type FormDataProps = {
  name: string
  email: string
  password: string
  password_confirm: string
}

const SignUpSchema = y.object({
  name: y.string().required('Nome obrigatório.'),
  email: y.string().required('E-mail obrigatório.').email('E-mail inválido.'),
  password: y.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  password_confirm: y.string().required('Confirme a senha').oneOf([y.ref('password')], 'A confirmação da senha não confere.')
})

export function SignUp() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(SignUpSchema)
  })

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.navigate("signIn")
  }

  function handleSignUp(data: FormDataProps) {
    console.log(data);
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

          <Text className="text-WHITE font-bold text-xl text-center mb-5">
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
              />
            )}
          />

          <Controller
            name="password_confirm"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme a senha"
                autoCapitalize="none"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button className="mt-3"
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