import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons'
import { useEffect, useState } from "react";
import Toast from "react-native-root-toast";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'

import { Button } from "@components/Button";
import { ExerciseDTO } from "@dtos/ExerciseDTO";

type RouteParamsProps = {
  exerciseId: string
}

export function Exercise() {
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)

  const navigation = useNavigation()

  const route = useRoute()
  const { exerciseId } = route.params as RouteParamsProps

  function handleGoBack() {
    navigation.goBack()
  }

  async function fetchExerciseDetails() {
    try {
      const response = await api.get(`exercises/${exerciseId}`)
      setExercise(response.data);
      
      
    } catch (error) {
      
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício.'

      Toast.show(title, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: '#F75A68',
        textColor: '#ffffff',
      })
    }
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [exerciseId])

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
          <Text className="flex-shrink text-xl text-WHITE font-semibold pr-4">{exercise.name}</Text>

          <View className="flex-row items-center">
            <BodySvg />
            <Text className="text-GRAY_300 text-base capitalize">{exercise.group}</Text>
          </View>
        </View>
      </View>

      <ScrollView className="p-8">
        <View>
          <View className="rounded-lg mb-3 overflow-hidden">
            <Image className='w-full h-80'
              source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`}}
              alt="Mulher fazendo exercício puxada frontal"
              resizeMode="cover"
            />
          </View>

          <View className="bg-GRAY_500 p-5 rounded-xl">
            <View className="flex-row justify-between px-2">
              <View className="flex-row items-center">
                <SeriesSvg />
                <Text className="text-GRAY_100 ml-2 text-base">{exercise.series} Series</Text>
              </View>

              <View className="flex-row items-center">
                <RepetitionsSvg />
                <Text className="text-GRAY_100 ml-2 text-base">{exercise.repetitions} repetições</Text>
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