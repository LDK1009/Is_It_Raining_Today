import { mixinFlex } from '@/styles/mixins'
import styled from '@emotion/native'
import React from 'react'
import { Modal, Pressable, StyleSheet, View } from 'react-native'

type CommonModalProps = {
  children: React.ReactNode
  open: boolean
  setClose: () => void
  backdropColor?: string
}

const CommonModal = ({ children, open, setClose, backdropColor = 'rgba(0, 0, 0, 0.3)' }: CommonModalProps) => {
  return (
    <Container
      visible={open}
      transparent
      animationType='fade'
      onRequestClose={() => setClose()}
    >
      <ModalContainer>
        {/* 백드롭: 화면 전체 덮고 터치 시 닫기 */}
        <BackdropPressable
          style={StyleSheet.absoluteFill}
          onPress={() => setClose()}
          backgroundColor={backdropColor}
        />

        {/* 시트: 백드롭과 형제. 여기엔 onPress 없음 → 내부 스크롤/터치 유지 */}
        <ContentLayer>{children}</ContentLayer>
      </ModalContainer>
    </Container>
  )
}

export default CommonModal

const Container = styled(Modal)``

const ModalContainer = styled(View)`
  flex: 1;
`

type BackdropProps = { backgroundColor: string }

const BackdropPressable = styled(Pressable)<BackdropProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
`

const ContentLayer = styled(View)`
  ${mixinFlex('column', 'center', 'center')};
  flex: 1;
`
