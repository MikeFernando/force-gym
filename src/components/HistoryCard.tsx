import { HistoryDTO } from "@dtos/HistoryDTO"
import { Text, View } from "react-native"

export type Props = {
  data: HistoryDTO
}

export function HistoryCard({ data }: Props) {
    return (
      <View className="bg-GRAY_500 mb-4 p-4 flex-row items-center rounded-md">
        <View className="flex-1">
          <Text className="text-WHITE text-lg">
            {data.group}
          </Text>
          <Text className="text-GRAY_200 text-base" numberOfLines={1}>
            {data.name}
          </Text>
        </View>

        <Text className="text-GRAY_200">{data.hours}</Text>
      </View>
    )
}