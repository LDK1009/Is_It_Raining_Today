import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

type PropsType = {
  options: OptionType[]
  placeholder: string
  onChange: (value: any) => void
  containerStyle?: StyleProp<ViewStyle>
  placeholderStyle?: StyleProp<TextStyle>
  selectedTextStyle?: StyleProp<TextStyle>
  itemTextStyle?: StyleProp<TextStyle>
}

type OptionType = {
  label: string
  value: any
}

const CommonDropDown = ({
  options,
  placeholder,
  onChange,
  containerStyle,
  placeholderStyle,
  selectedTextStyle,
  itemTextStyle,
}: PropsType) => {
  return (
    <Container
      data={options}
      labelField='label'
      valueField='value'
      placeholder={placeholder}
      onChange={(item) => onChange(item.value)}
      ///// 옵션 전체 컨테이너 스타일
      containerStyle={[
        {
          marginTop: 4,
          backgroundColor: theme.colors.background.paper,
          borderRadius: 8,
          padding: 8,
          borderWidth: 0,
          maxHeight: 200,
        },
        containerStyle,
      ]}
      ///// 옵션 아이템 컨테이너 스타일
      itemContainerStyle={[{}]}
      ///// 선택된 옵션의 배경색
      activeColor={theme.colors.background.default}
      ///// 플레이스홀더 스타일
      placeholderStyle={[
        {
          color: theme.colors.core.white,
          fontSize: theme.fontSizes.body,
        },
        placeholderStyle,
      ]}
      ///// 선택된 옵션 아이템 텍스트 스타일
      selectedTextStyle={[
        {
          color: theme.colors.core.white,
          fontSize: theme.fontSizes.body,
          backgroundColor: theme.colors.background.paper,
        },
        selectedTextStyle,
      ]}
      ///// 옵션 아이템 텍스트 스타일
      itemTextStyle={[
        {
          color: theme.colors.core.white,
          fontSize: theme.fontSizes.body,
        },
        itemTextStyle,
      ]}
    />
  )
}

export default CommonDropDown

const Container = styled(Dropdown)`
  width: 100%;
  padding: 16px;

  border-radius: 8px;
  background-color: ${theme.colors.background.paper};
`
