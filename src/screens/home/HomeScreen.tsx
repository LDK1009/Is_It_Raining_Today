import styled from '@emotion/native'
import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {
  return (
    <Container>
      <Text>HomeScreen</Text>
    </Container>
  )
}

export default HomeScreen

const Container = styled(SafeAreaView)`
  flex: 1;
`
