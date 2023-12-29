import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import { Entypo } from '@expo/vector-icons'

export type Props = TouchableOpacityProps & {
  image: string
  name: string
  series: number
  repetitions: number
}

export function ExerciseCard({ image, name, series, repetitions, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest} className="bg-GRAY_500 mx-8 rounded-md flex-row p-2 pr-4 items-center mb-4">
      <Image className="rounded-md mr-4"
        source={{ uri: `${image}` }}
        alt="Puxada frontal"
        width={64}
          height={64}
      />

      <View className="flex-1">
        <Text className="text-WHITE text-lg font-semibold leading-tight"> {name}</Text>
        <Text className="text-GRAY_200 text-sm">{series} séries x {repetitions} repetições</Text>
      </View>

      <Entypo
        name="chevron-thin-right"
        size={20}
        color={'#ffcc29'}
      />
    </TouchableOpacity>
  )
}