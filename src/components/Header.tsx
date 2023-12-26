import { Text, View } from "react-native";

export function Header() {
  return (
      <View className="bg-GRAY_600 pt-16 px-8 pb-6">
        <Text className="text-GRAY_200 text-xl">
          Olá,
        </Text>
        <Text className="text-white text-lg font-bold">
          Mike Fernando
        </Text>
      </View>
  )
}