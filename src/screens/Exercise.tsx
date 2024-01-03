import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Toast from "react-native-root-toast";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { ExerciseDTO } from "@dtos/ExerciseDTO";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";

import { Button } from "@components/Button";
import { AppRoutesNavigatorProps } from "@routes/AppRoutes";

type RouteParamsProps = {
  exerciseId: string;
};

export function Exercise() {
  const [sendingRegister, setSendingRegister] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);

  const navigation = useNavigation<AppRoutesNavigatorProps>();

  const route = useRoute();
  const { exerciseId } = route.params as RouteParamsProps;

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);

      const response = await api.get(`exercises/${exerciseId}`);
      setExercise(response.data)

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício.";

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

  async function handleRegisterExerciseHistory() {
    try {
      setSendingRegister(true);

      await api.post('/history', { exercise_id: exerciseId });

      Toast.show('Parabéns! Exercício está registrado no seu histórico.', {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: "#00B37E",
        textColor: "#ffffff",
      });

      navigation.navigate('history')

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível registrar o exercício no histórico.";

      Toast.show(title, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: "#F75A68",
        textColor: "#ffffff",
      });
    } finally {
      setSendingRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <View className="flex-1">
      <View className="pt-12 pb-8 px-8 bg-GRAY_500">
        <TouchableOpacity onPress={handleGoBack}>
          <Feather name="arrow-left" size={24} color={"#ffcc29"} />
        </TouchableOpacity>

        <View className="flex-row items-center justify-between mt-5">
          <Text className="flex-shrink text-xl text-WHITE font-semibold pr-4">
            {exercise.name}
          </Text>

          <View className="flex-row items-center">
            <BodySvg />
            <Text className="text-GRAY_300 text-base capitalize">
              {exercise.group}
            </Text>
          </View>
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator className="flex-1 justify-center items-center" />
      ) : (
        <ScrollView className="p-8">
          <View>
            <View className="rounded-lg mb-3 overflow-hidden">
              <Image className="w-full h-80"
                source={{uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`}}
                alt="Mulher fazendo exercício puxada frontal"
                resizeMode="cover"
              />
            </View>

            <View className="bg-GRAY_500 p-5 rounded-xl">
              <View className="flex-row justify-between px-2">
                <View className="flex-row items-center">
                  <SeriesSvg />
                  <Text className="text-GRAY_100 ml-2 text-base">
                    {exercise.series} Series
                  </Text>
                </View>

                <View className="flex-row items-center">
                  <RepetitionsSvg />
                  <Text className="text-GRAY_100 ml-2 text-base">
                    {exercise.repetitions} repetições
                  </Text>
                </View>
              </View>

              <Button className="mt-5" 
                title="Marcar como realizado" 
                onPress={handleRegisterExerciseHistory}
                isLoading={sendingRegister}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
