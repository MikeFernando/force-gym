import { ScrollView, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from "react-hook-form"
import { Image } from "react-native"
import * as y from 'yup'

import { AuthNavigatorRoutesProps } from "@routes/AuthRoutes"

import Background from '@assets/background.png'
import Logo from '@assets/logo.png'

import { Button } from "@components/Button"
import { Input } from "@components/Input"

type FormDataProps = {
  email: string
  password: string
}

const SignInSchema = y.object({
  email: y.string().required('E-mail obrigatório.').email('E-mail inválido.'),
  password: y.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
})

export function SignIn() 
{
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(SignInSchema)
  })

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNewAccount() {
    navigation.navigate("signUp")
  }
  
  function handleSignIn(data: FormDataProps) {
    console.log(data);
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

        <View className="items-center w-full justify-center absolute top-20">
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
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button className="mt-1" 
            title="Acessar"
            onPress={handleSubmit(handleSignIn)}
          />

          <Text className="text-base text-WHITE mt-20">
            Ainda não tem acesso?
          </Text>

          <Button className="mt-5"
            title="Criar conta"
            variant="SECONDARY"
            onPress={handleNewAccount}
          />
        </View>
      </View>
    </ScrollView>
  )
}