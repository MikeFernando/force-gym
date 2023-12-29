import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";

import { AuthRoutes } from "./AuthRoutes";
import { AppRoutes } from "./AppRoutes";

export function Routes() {
  const theme = DefaultTheme
  theme.colors.background = '#121214'

  return (
    <View className="flex-1 bg-GRAY_700">
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </View>
  )
}