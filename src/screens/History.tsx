import { useState } from "react";
import { Image, SectionList, Text, View } from "react-native";

import BackgroundHistory from '@assets/bg-history.png'

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";

export function History() {
  const [exercises, setExercise] = useState([
    {
      title: '26.12.2023',
      data: ['Puxada frontal'],
    },
    {
      title: '27.12.2023',
      data: ['Puxada frontal'],
    },
  ])


  return (
    <View className="flex-1">
      <ScreenHeader title="Histórico de Exercícios" />
      <Image
        source={BackgroundHistory}
        defaultSource={BackgroundHistory}
        alt="Pessoas treinando"
        resizeMode="cover"
        className=""
      />

      <View className="absolute translate-y-32 w-full">
        <SectionList 
          sections={exercises}
          keyExtractor={item => item}  
          renderItem={({ item }) => (
            <HistoryCard />
          )}
          className="px-8"
          renderSectionHeader={({ section }) => (
            <Text className="text-GRAY_200 text-lg mb-2 font-semibold">
              {section.title}
            </Text>
          )}  
        />
      </View>
    </View>
  )
}