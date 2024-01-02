import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";

import { useAuth } from "@hooks/useAuth";

import { AuthRoutes } from "./AuthRoutes";
import { AppRoutes } from "./AppRoutes";

import { Loading } from "@components/Loading";

export function Routes() {
  const { user, isLoadingStorageUserData } = useAuth()
  
  const theme = DefaultTheme
  theme.colors.background = '#121214'

  if (isLoadingStorageUserData) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-GRAY_700">
      <NavigationContainer theme={theme}>
        { user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  )
}