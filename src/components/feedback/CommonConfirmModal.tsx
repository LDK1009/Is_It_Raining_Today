import { useConfirmModalStore } from '@/stores/common/modal'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React from 'react'
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const CommonConfirmModal = () => {
  const {
    open,
    setOpen,
    description,
    title,
    backgroundColor,
    backdropColor,
    borderRadius,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
  } = useConfirmModalStore()

  return (
    <Container
      visible={open}
      transparent
      animationType='fade'
      onRequestClose={() => setOpen(false)}
    >
      <ModalContainer>
        {/* 백드롭: 화면 전체 덮고 터치 시 닫기 */}
        <BackdropPressable
          style={StyleSheet.absoluteFill}
          onPress={() => setOpen(false)}
          backgroundColor={backdropColor}
        />

        {/* 시트: 백드롭과 형제. 여기엔 onPress 없음 → 내부 스크롤/터치 유지 */}
        <ContentContainer>
          <SheetContainer backgroundColor={backgroundColor} borderRadius={borderRadius}>
            {/* 텍스트 컨테이너 */}
            <TextContainer>
              {/* 제목 */}
              <Title>{title}</Title>
              {/* 설명 */}
              <Description>{description}</Description>
            </TextContainer>

            {/* 버튼 컨테이너 */}
            <ButtonContainer>
              {/* 취소 버튼 */}
              <CancelButton onPress={onCancel}>
                <CancelButtonText>{cancelText}</CancelButtonText>
              </CancelButton>
              {/* 확인 버튼 */}
              <ConfirmButton
                onPress={() => {
                  setOpen(false)
                  onConfirm()
                }}
              >
                <ConfirmButtonText>{confirmText}</ConfirmButtonText>
              </ConfirmButton>
            </ButtonContainer>
          </SheetContainer>
        </ContentContainer>
      </ModalContainer>
    </Container>
  )
}

export default CommonConfirmModal

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
  ${mixinFlex('column', 'center', 'center')}
`

type SheetContainerProps = {
  backgroundColor: string
  borderRadius: number
}

const SheetContainer = styled(View)<SheetContainerProps>`
  ${mixinFlex('column', 'flex-start', 'flex-end')}
  row-gap: 24px;

  width: auto;
  max-width: 80%;
  height: auto;
  padding: 32px 24px;

  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
  overflow: hidden;
`

const TextContainer = styled(View)`
  ${mixinFlex('column', 'flex-start', 'flex-start')}
  row-gap: 8px;
`

const Title = styled(Text)`
  font-size: ${`${theme.fontSizes.subtitle}px`};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.core.white};
`

const Description = styled(Text)`
  font-size: ${`${theme.fontSizes.body}px`};
  font-weight: ${theme.fontWeights.regular};
  color: rgba(255, 255, 255, 0.7);
`

const ButtonContainer = styled(View)`
  ${mixinFlex('row', 'center', 'center')}
  column-gap: 8px;
`

const ConfirmButton = styled(TouchableOpacity)`
  ${mixinFlex('row', 'center', 'center')}
  width:auto;
  padding: 8px;

  background-color: ${theme.colors.core.white};
  border-radius: 8px;
`

const ConfirmButtonText = styled(Text)`
  font-size: ${`${theme.fontSizes.body}px`};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.core.black};
`

const CancelButton = styled(ConfirmButton)`
  background-color: transparent;
`

const CancelButtonText = styled(ConfirmButtonText)`
  color: rgba(255, 255, 255, 0.7);
`
