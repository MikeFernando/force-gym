import { Text, View } from "react-native"

export type Props = {
  title: string
}
export function ScreenHeader({ title }: Props) {
  return (
    <View className="bg-GRAY_500 pt-16 px-8 pb-6 items-center justify-center">
      <Text className="text-GRAY_100 text-lg text-center font-semibold">
        {title}
      </Text>
    </View>
  )
}