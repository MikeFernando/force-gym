import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  title: string
  variant?: 'PRIMARY' | 'SECONDARY'
}

export function Button({ title, variant = 'PRIMARY', ...rest }: Props) {
  return (
    <>
      { variant === 'PRIMARY' ? (
        <TouchableOpacity {...rest} className="bg-BLUE_500 p-[14px] rounded w-full">
          <Text className="text-WHITE text-center font-bold text-base">
            {title}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity {...rest} className="p-[14px] rounded w-full border border-BLUE_500">
          <Text className="text-BLUE_500 text-center font-bold text-base">
            {title}
          </Text>
        </TouchableOpacity>
      )}
      </>
  )
}