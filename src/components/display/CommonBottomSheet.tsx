import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React from 'react'
import { Modal, Pressable, StyleSheet, View } from 'react-native'

interface CommonBottomSheetProps {
  visible: boolean
  onClose: () => void
  children: React.ReactNode
  height?: number | string
  backgroundColor?: string
  backdropColor?: string
  borderRadius?: number
}

const CommonBottomSheet = ({
  visible,
  onClose,
  children,
  height = 300,
  backgroundColor = theme.colors.background.paper,
  backdropColor = 'rgba(0, 0, 0, 0.3)',
  borderRadius = 16,
}: CommonBottomSheetProps) => {
  return (
    <Container visible={visible} transparent animationType='slide' onRequestClose={onClose}>
      <ModalContainer>
        {/* 백드롭: 화면 전체 덮고 터치 시 닫기 */}
        <BackdropPressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          backgroundColor={backdropColor}
        />

        {/* 시트: 백드롭과 형제. 여기엔 onPress 없음 → 내부 스크롤/터치 유지 */}
        <ContentContainer>
          <SheetContainer
            height={height}
            backgroundColor={backgroundColor}
            borderRadius={borderRadius}
          >
            {children}
          </SheetContainer>
        </ContentContainer>
      </ModalContainer>
    </Container>
  )
}

export default CommonBottomSheet

const Container = styled(Modal)``

const ModalContainer = styled(View)`
  flex: 1;
`

type BackdropProps = { backgroundColor: string }

const BackdropPressable = styled(Pressable)<BackdropProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
`

const ContentContainer = styled(View)`
  flex: 1;
  justify-content: flex-end;
`

type SheetContainerProps = {
  height: number | string
  backgroundColor: string
  borderRadius: number
}

const SheetContainer = styled(View)<SheetContainerProps>`
  width: 100%;
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
  background-color: ${({ backgroundColor }) => backgroundColor};
  overflow: hidden;

  /* RN은 4값 축약 border-radius 미지원 → 위쪽만 개별 지정 */
  border-top-left-radius: ${({ borderRadius }) => `${borderRadius}px`};
  border-top-right-radius: ${({ borderRadius }) => `${borderRadius}px`};
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0;
`
