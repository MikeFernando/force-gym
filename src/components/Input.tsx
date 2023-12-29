import { Text, TextInput, TextInputProps } from "react-native";
import { useState } from "react";

interface Props extends TextInputProps {
  errorMessage?: string | null;
}

export function Input({ errorMessage = null, ...rest }: Props) 
{
  const [isFocused, setIsFocused] = useState(false);

  const isInvalid = !!errorMessage || null

  return (
    <>
      <TextInput className="bg-GRAY_700 w-full px-4 py-4 rounded h-14 text-GRAY_100 text-base mb-3"
        {...rest}
        style={[
            rest.style, 
            isFocused && { borderWidth: 1, borderColor: '#2176ff' },
            isInvalid && { borderWidth: 1, borderColor: '#F75A68' }
          ]}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        placeholderTextColor='#7C7C8A'
      />
      {
        errorMessage &&  <Text className="text-RED self-start mb-2 -translate-y-3 ml-1">{errorMessage}</Text>
      }
    </>
  )
}