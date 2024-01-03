import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import { Entypo } from '@expo/vector-icons'

import { api } from "@services/api"
import { ExerciseDTO } from "@dtos/ExerciseDTO"

export type Props = TouchableOpacityProps & {
  data: ExerciseDTO 
}

export function ExerciseCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest} className="bg-GRAY_500 mx-8 rounded-md flex-row p-2 pr-4 items-center mb-4">
      <Image className="rounded-md mr-4"
        source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}` }}
        alt={data.name}
        width={64}
          height={64}
      />

      <View className="flex-1">
        <Text className="text-WHITE text-lg font-semibold leading-tight" numberOfLines={1}>
          {data.name}
        </Text>

        <Text className="text-GRAY_200 text-sm ml-1">
          {data.series} séries x {data.repetitions} repetições
        </Text>
      </View>

      <Entypo
        name="chevron-thin-right"
        size={20}
        color={'#ffcc29'}
      />
    </TouchableOpacity>
  )
}