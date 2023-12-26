import { useState } from "react";
import { TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {}

export function Input({ ...rest }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      {...rest}
      style={[rest.style, isFocused && {borderWidth: 1, borderColor: '#2176ff'}]}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      className="bg-GRAY_700 w-full px-4 py-4 rounded h-14 text-GRAY_100 text-base mb-4"
      placeholderTextColor='#7C7C8A'
    />
  )
}