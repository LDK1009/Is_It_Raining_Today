import { theme } from '@/styles/theme'
import React from 'react'
import { Text, View } from 'react-native'

type PropsType = {
  children: string
  size?: 'meta' | 'caption' | 'body' | 'subtitle' | 'title' | 'custom'
  color?: 'default' | 'white' | 'black' | 'custom'
  customSize?: number
  customColor?: string
}

const CommonText = ({
  children,
  size = 'body',
  color = 'default',
  customSize,
  customColor,
}: PropsType) => {
  const textSize =
    size === 'custom'
      ? customSize
      : size === 'meta'
        ? theme.fontSizes.meta
        : size === 'caption'
          ? theme.fontSizes.caption
          : size === 'body'
            ? theme.fontSizes.body
            : size === 'subtitle'
              ? theme.fontSizes.subtitle
              : theme.fontSizes.title

  const textColor =
    color === 'custom'
      ? customColor
      : color === 'default'
        ? theme.colors.core.white
        : color === 'white'
          ? theme.colors.core.white
          : theme.colors.core.black

  return (
    <View>
      <Text selectable style={{ fontSize: textSize, color: textColor }}>
        {children}
      </Text>
    </View>
  )
}

export default CommonText
