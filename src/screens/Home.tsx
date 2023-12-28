import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, Text, View } from "react-native";

import HomeBackground from '@assets/background-home.png'

import { Group } from "@components/Group";
import { Header } from "@components/Header";
import { useState } from "react";
import { ExerciseCard } from "@components/ExerciseCard";

import { AppRoutesNavigatorProps } from "@routes/AppRoutes";

export function Home() {
  const [groups, setGroups] = useState(['costas', 'peito', 'perna', 'ombro', 'bíceps'])
  const [exercise, setExercise] = useState(['Puxada Frontal', 'Remada Curvada', 'Remada Unilateral', 'Levantamento Terra'])
  const [groupSelected, setGroupSelected] = useState('costas')

  const navigation = useNavigation<AppRoutesNavigatorProps>()

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }

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
            4
          </Text>
        </View>

        <FlatList
          data={exercise}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard
              onPress={handleOpenExerciseDetails}
              image='https://static.strengthlevel.com/images/illustrations/reverse-grip-lat-pulldown-1000x1000.jpg'
              name={item}
              series={3}
              repetitions={12}
            />
          )}
        />
      </View>
    </View>
  )
}