import { Dimensions, ViewStyle } from 'react-native'

const { height: screenHeight } = Dimensions.get('window')

///// 컨테이너 믹스인
export const mixinContainer = (): ViewStyle => ({
  flex: 1,
})

///// 컨텐츠 컨테이너 믹스인
export const mixinContentContainer = (
  padding: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 = 1,
  gap: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 = 1
): ViewStyle => ({
  padding: padding * 8,
  gap: gap * 8,
})

///// Flex 믹스인
export const mixinFlex = (
  direction: 'row' | 'column' = 'row',
  justifyContent:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly' = 'center',
  alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' = 'center',
  gap?: number
): ViewStyle => ({
  display: 'flex',
  flexDirection: direction,
  justifyContent: justifyContent,
  alignItems: alignItems,
  ...(gap && { gap }),
})
