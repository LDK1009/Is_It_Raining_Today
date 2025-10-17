import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React from 'react'
import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'

interface ButtonProps {
  title: string
  onPress: () => void
  icon?: React.ReactNode
  iconPosition?: 'start' | 'end'
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

const CommonButton = ({
  title,
  onPress,
  icon,
  iconPosition = 'start',
  containerStyle,
  textStyle,
}: ButtonProps) => {
  return (
    <Container onPress={onPress} style={[{ padding: 8, borderRadius: 8 }, containerStyle]}>
      {iconPosition === 'start' && icon}
      <ButtonText
        style={[
          {
            color: theme.colors.core.white,
            fontSize: theme.fontSizes.body,
          },
          textStyle,
        ]}
      >
        {title}
      </ButtonText>
      {iconPosition === 'end' && icon}
    </Container>
  )
}

export default CommonButton

const Container = styled(TouchableOpacity)`
  ${mixinFlex('row', 'center', 'center')}
  column-gap: 4px;

  width: 100%;
  background-color: ${theme.colors.background.paper};
`

const ButtonText = styled(Text)``
