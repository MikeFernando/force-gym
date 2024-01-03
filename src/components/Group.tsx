import { Pressable, PressableProps, Text } from "react-native"

export type Props = PressableProps & {
  name: string;
  isActive: boolean;
}

export function Group({ name, isActive = false, ...rest }: Props) {
  return (
      <Pressable {...rest} className={`bg-GRAY_600 rounded-md py-2 w-24 h-10 mr-3 items-center justify-center overflow-hidden ${isActive ? 'border border-YELLOW_400' : ''}`}>
        <Text className={`text-GRAY_200 text-center uppercase text-sm ${isActive && 'text-YELLOW_400'}`}>
          {name}
        </Text>
      </Pressable>
  )
}