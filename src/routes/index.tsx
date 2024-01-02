import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";

import { AuthContextProvider } from "@contexts/AuthContext";
import { useAuth } from "@hooks/useAuth";

import { AuthRoutes } from "./AuthRoutes";
import { AppRoutes } from "./AppRoutes";

export function Routes() {
  const { user } = useAuth()
  
  const theme = DefaultTheme
  theme.colors.background = '#121214'

  return (
    <View className="flex-1 bg-GRAY_700">
      <NavigationContainer theme={theme}>
        { user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  )
}