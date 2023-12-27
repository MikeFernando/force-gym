import { useState } from "react";
import { Image, SectionList, Text, View } from "react-native";

import BackgroundHistory from '@assets/logo.png'

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";

export function History() {
  const [exercises, setExercise] = useState([
    {
      title: '26.12.2023',
      data: ['Puxada frontal', 'Remada unilateral'],
    },
    {
      title: '27.12.2023',
      data: ['Puxada frontal'],
    },
  ])

  return (
    <View className="flex-1">
      <ScreenHeader title="Histórico de Exercícios" />

      <View className="absolute translate-y-32 w-full">
        <SectionList 
          sections={exercises}
          keyExtractor={item => item}  
          renderItem={({ item }) => (
            <HistoryCard />
          )}
          className="px-8"
          renderSectionHeader={({ section }) => (
            <Text className="text-GRAY_200 text-base px-1 mb-2 font-semibold">
              {section.title}
            </Text>
          )}
          ListEmptyComponent={() => (
            <View className="items-center justify-center mt-32">
              <Image
                source={BackgroundHistory}
                defaultSource={BackgroundHistory}
                alt="Pessoas treinando"
                resizeMode="contain"
                className="opacity-80"
              />

              <Text className="text-GRAY_300 text-base">
                Não há exercícios registrados ainda.
              </Text>
              <Text className="text-GRAY_300 text-base">
                Bora treinar hoje?
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}