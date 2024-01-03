import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import Toast from "react-native-root-toast";

import { ExerciseDTO } from "@dtos/ExerciseDTO";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import HomeBackground from '@assets/background-home.png'

import { Group } from "@components/Group";
import { Header } from "@components/Header";
import { ExerciseCard } from "@components/ExerciseCard";

import { AppRoutesNavigatorProps } from "@routes/AppRoutes";

export function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])
  const [exercise, setExercise] = useState<ExerciseDTO[]>([])
  const [groupSelected, setGroupSelected] = useState('antebraço')

  const navigation = useNavigation<AppRoutesNavigatorProps>()

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate('exercise', { exerciseId })
  }

  async function getGroups() {
    try {
      const response = await api.get('/groups')
      setGroups(response.data);
      
      
    } catch (error) {
      
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares.'

      Toast.show(title, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: '#F75A68',
        textColor: '#ffffff',
      })
    }
  }

  async function fetchExerciseByGroup() {
    try {
      setIsLoading(true)

      const response = await api.get(`/exercises/bygroup/${groupSelected}`)
      setExercise(response.data);
      
    } catch (error) {
      
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar os exercícios.'

      Toast.show(title, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: '#F75A68',
        textColor: '#ffffff',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getGroups()
  }, [])

  useFocusEffect(useCallback(() => {
    fetchExerciseByGroup()
  }, [groupSelected]))

  return (
    <View className="flex-1">
      <Header />

      <Image
        source={HomeBackground}
        defaultSource={HomeBackground}
        alt="Pessoas treinando"
        resizeMode="contain"
      />

      <View className="absolute translate-y-32">
        <FlatList
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Group
              name={item}
              isActive={groupSelected === item}
              onPress={() => setGroupSelected(item)}
            />
          )}
          horizontal
          contentContainerStyle={{ padding: 32, height: 80 }}
          showsHorizontalScrollIndicator={false}
        />

        <View className="flex-row justify-between items-center px-8 mt-4 mb-5">
          <Text className="text-GRAY_100 text-base">
            Exercícios
          </Text>
          <Text className="text-GRAY_100 leading text-md font-bold">
            {exercise.length}
          </Text>
        </View>

        {
          isLoading 
          ? <ActivityIndicator className="flex-1 items-center justify-center mt-40" />
          : (<FlatList
              data={exercise}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <ExerciseCard
                  data={item}
                  onPress={() => handleOpenExerciseDetails(item.id)}
                />
              )}
            />
          )     
        }
      </View>
    </View>
  )
}