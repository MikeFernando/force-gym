import { FlatList, Image, Text, View } from "react-native";

import HomeBackground from '@assets/background-home.png'

import { Group } from "@components/Group";
import { Header } from "@components/Header";
import { useState } from "react";
import { ExerciseCard } from "@components/ExerciseCard";

export function Home() {
  const [groups, setGroups] = useState(['costas', 'peito', 'perna', 'ombro', 'bíceps'])
  const [groupSelected, setGroupSelected] = useState('costas')

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

         <ExerciseCard 
            image='https://www.shutterstock.com/image-vector/woman-doing-cable-rope-tricep-260nw-2214158917.jpg'
            name="Tríceps em Pé"
            series={3}
            repetitions={12} 
         />
         <ExerciseCard 
            image='https://www.shutterstock.com/shutterstock/photos/2044848959/display_1500/stock-vector-man-doing-seated-lat-pulldowns-flat-vector-illustration-isolated-on-white-background-2044848959.jpg'
            name="Puxada Frontal"
            series={3}
            repetitions={12} 
         />
         <ExerciseCard 
            image='https://www.shutterstock.com/image-vector/man-doing-lying-crossover-bench-260nw-2380480027.jpg'
            name="Supino Cruzado"
            series={3}
            repetitions={12} 
         />
         <ExerciseCard 
            image='https://www.shutterstock.com/image-vector/woman-doing-straight-arm-rope-260nw-2396082303.jpg'
            name="Suspensão Lateral"
            series={3}
            repetitions={12} 
         />
        </View>
      </View>
  )
}