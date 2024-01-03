import { ActivityIndicator, Image, SectionList, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import Toast from "react-native-root-toast";

import BackgroundHistory from "@assets/logo.png";

import { api } from "@services/api";

import { AppError } from "@utils/AppError";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";
import { HistoryByDay } from "@dtos/HistoryByDay";

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercise] = useState<HistoryByDay[]>([]);

  async function fetchHistory() {
    try {
      setIsLoading(true);

      const response = await api.get('/history');
      setExercise(response.data);
      
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível carregar o histórico.";

      Toast.show(title, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: "#F75A68",
        textColor: "#ffffff",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <View className="flex-1">
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View className="absolute translate-y-32 w-full">
          <SectionList
            className="px-8"
            sections={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <HistoryCard data={item}/>}
            renderSectionHeader={({ section }) => (
              <Text className="text-GRAY_200 text-base px-1 mb-2 font-semibold">
                {section.title}
              </Text>
            )}
            ListEmptyComponent={() => (
              <View className="items-center justify-center mt-32">
                <Image
                  className="opacity-80"
                  source={BackgroundHistory}
                  defaultSource={BackgroundHistory}
                  alt="Pessoas treinando"
                  resizeMode="contain"
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
      )}
    </View>
  );
}
