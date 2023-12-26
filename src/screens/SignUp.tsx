import { useNavigation } from "@react-navigation/native"
import { ScrollView, Text, View } from "react-native"
import { Image } from "react-native"

import { AuthNavigatorRoutesProps } from "@routes/AuthRoutes"

import Background from '@assets/background.png'
import Logo from '@assets/logo.png'

import { Button } from "@components/Button"
import { Input } from "@components/Input"

export function SignUp() {

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.navigate("signIn")
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

        <View className="items-center w-full justify-center absolute top-24">
          <Image
            source={Logo}
            className="-translate-y-20"
          />

          <Text className="text-WHITE font-bold text-xl text-center mb-5">
            Crie sua conta
          </Text>

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            placeholder="Senha"
            autoCapitalize="none"
            secureTextEntry
          />
          <Input
            placeholder="Confirme a senha"
            autoCapitalize="none"
            secureTextEntry
          />

          <Button
            className="mt-5"
            title="Criar e acessar"
          />
          <Button
            className="mt-16"
            variant="SECONDARY"
            title="Voltar para o login"
            onPress={handleGoBack}
          />
        </View>
      </View>
    </ScrollView>
  )
}