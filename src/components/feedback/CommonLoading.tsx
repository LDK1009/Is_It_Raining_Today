import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const CommonLoading = () => {
  return (
    <LoadingContainer>
      <ActivityIndicator size='large' color={theme.colors.core.white} animating={true} />
    </LoadingContainer>
  )
}

export default CommonLoading

////////// 스타일링
const LoadingContainer = styled(View)`
  padding: 20px;
  align-items: center;
`
