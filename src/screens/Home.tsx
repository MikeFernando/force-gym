import { FlatList, View } from "react-native";

import { Group } from "@components/Group";
import { Header } from "@components/Header";
import { useState } from "react";

export function Home() {
  const [groups, setGroups] = useState(['costas', 'peito', 'perna', 'ombro', 'bíceps'])
  const [groupSelected, setGroupSelected] = useState('costas')

  return (
      <View className="flex-1">
        <Header />
        
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
      </View>
  )
}