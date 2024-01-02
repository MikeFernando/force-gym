import { RootSiblingParent } from 'react-native-root-siblings';
import { StatusBar } from 'expo-status-bar'

import { AuthContextProvider } from '@contexts/AuthContext';

import { Routes } from './src/routes'
import { View } from 'react-native'

export default function App() {
  return (
    <View className='flex-1'>
      <StatusBar style="light" translucent />
      <AuthContextProvider>
        <RootSiblingParent>
          <Routes />
        </RootSiblingParent>
      </AuthContextProvider>
    </View>
  )
}
