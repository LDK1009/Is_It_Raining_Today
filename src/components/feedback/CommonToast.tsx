import { theme } from '@/styles/theme'
import React from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message'

const CommonToast = () => {
  ///// 토스트 스타일
  const baseStyle = {
    borderLeftWidth: 0,
    borderRadius: 8,
    width: '80%',
    zIndex: theme.zIndices.toast,
    height: 40,
  }

  ///// 토스트 컨텐츠 스타일

  const contentStyle = {
    paddingHorizontal: 16,
    zIndex: theme.zIndices.toast,
  }

  ///// 토스트 텍스트 스타일
  const textStyle = {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.core.white,
  }

  ///// 토스트 구성 설정
  const toastConfig = {
    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={
          { ...baseStyle, backgroundColor: theme.colors.status.success } as StyleProp<ViewStyle>
        }
        contentContainerStyle={contentStyle}
        text1Style={textStyle as StyleProp<TextStyle>}
      />
    ),
    error: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{ ...baseStyle, backgroundColor: theme.colors.status.error } as StyleProp<ViewStyle>}
        contentContainerStyle={contentStyle}
        text1Style={textStyle as StyleProp<TextStyle>}
      />
    ),
    info: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{ ...baseStyle, backgroundColor: theme.colors.status.info } as StyleProp<ViewStyle>}
        contentContainerStyle={contentStyle}
        text1Style={textStyle as StyleProp<TextStyle>}
      />
    ),
  }

  return (
    <Toast
      visibilityTime={1.5 * 1000}
      config={toastConfig}
      topOffset={60}
      position='top' // 'top' | 'bottom'
      autoHide={true}
    />
  )
}

export default CommonToast
