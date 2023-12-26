import { Image, ImageProps } from "react-native"

export type Props = ImageProps & {
  size: number
}

export function UserPhoto({ size, ...rest }: Props) {
  return (
      <Image
        className="rounded-full border-2 border-GRAY_400"
        width={size}
        height={size}
        {...rest}
      />
  )
}