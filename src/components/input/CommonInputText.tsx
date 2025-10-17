import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React from 'react'
import { StyleProp, TextInput, TextStyle } from 'react-native'

type PlaceholderStyle = {
  color?: string
  fontSize?: string
  fontWeight?: string
}

type PropsType = {
  placeholder: string
  onChangeText: (text: string) => void
  value: string
  containerStyle?: StyleProp<TextStyle>
  placeholderStyle?: PlaceholderStyle
  multiline?: boolean
}

const CommonInputText = ({
  placeholder,
  onChangeText,
  value,
  containerStyle,
  placeholderStyle,
  multiline = false,
}: PropsType) => {
  return (
    <Container
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      style={containerStyle}
      placeholderTextColor={placeholderStyle?.color || 'rgba(255, 255, 255, 0.5)'}
      placeholderStyle={placeholderStyle}
      multiline={multiline}
    />
  )
}

export default CommonInputText

type ContainerProps = {
  placeholderStyle?: PlaceholderStyle
}

const Container = styled(TextInput)<ContainerProps>`
  width: 100%;
  padding: 16px;
  color: ${theme.colors.core.white};
  background-color: ${theme.colors.background.paper};
  border-radius: 8px;
  font-size: ${({ placeholderStyle }) => placeholderStyle?.fontSize};

  &::placeholder {
    color: ${({ placeholderStyle }) => placeholderStyle?.color};
    font-size: ${({ placeholderStyle }) => placeholderStyle?.fontSize};
    font-weight: ${({ placeholderStyle }) => placeholderStyle?.fontWeight};
  }
`
