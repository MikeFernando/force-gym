import { Text, View } from "react-native"

export type Props = {}

export function HistoryCard({}: Props) {
  return (
    <View className="bg-GRAY_500 mb-4 p-4 flex-row items-center rounded-md">
      <View className="flex-1">
        <Text className="text-WHITE text-lg">
          Costa
        </Text>
        <Text className="text-GRAY_200 text-base">
          Puxada Frontal
        </Text>
      </View>

      <Text className="text-GRAY_200">
        08:56
      </Text>
    </View>
  )
}