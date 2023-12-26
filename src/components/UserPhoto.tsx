import { Image, ImageProps } from "react-native"

export type Props = ImageProps & {
  size: number
}

export function UserPhoto({ size, ...rest }: Props) {
  return (
      <Image
        className="rounded-full"
        style={{ borderWidth: 2, borderColor: '#C4C4CC' }}
        width={size}
        height={size}
        {...rest}
      />
  )
}