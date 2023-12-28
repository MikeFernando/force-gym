import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons'

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import { Button } from "@components/Button";

export function Exercise() {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <View className="flex-1">
      <View className="pt-12 pb-8 px-8 bg-GRAY_500">
        <TouchableOpacity onPress={handleGoBack}>
          <Feather
            name="arrow-left"
            size={24}
            color={'#ffcc29'}
          />
        </TouchableOpacity>

        <View className="flex-row items-center justify-between mt-5">
          <Text className="flex-shrink text-xl text-WHITE font-semibold"> Puxada Frontal</Text>

          <View className="flex-row items-center">
            <BodySvg />
            <Text className="text-GRAY_300 text-base capitalize">costas</Text>
          </View>
        </View>
      </View>

      <ScrollView className="p-8">
        <View>
          <Image className='w-full h-80 mb-3 rounded-xl'
            source={{ uri: 'https://static.strengthlevel.com/images/illustrations/reverse-grip-lat-pulldown-1000x1000.jpg' }}
            alt="Mulher fazendo exercício puxada frontal"
            resizeMode="cover"
          />

          <View className="bg-GRAY_500 p-5 rounded-xl">
            <View className="flex-row justify-between px-2">
              <View className="flex-row items-center">
                <SeriesSvg />
                <Text className="text-GRAY_100 ml-2 text-base">3 Series</Text>
              </View>

              <View className="flex-row items-center">
                <RepetitionsSvg />
                <Text className="text-GRAY_100 ml-2 text-base">12 repetições</Text>
              </View>
            </View>

            <Button className="mt-5"
              title="Marcar como realizado"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}