import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { ReactNode } from 'react'
import { Text } from 'react-native'
import RNTooltip from 'rn-tooltip'

type PropsType = {
  children: ReactNode
  content: string
  top?: number
  left?: number
  right?: number
  bottom?: number
}

const CommonTooltip = ({ children, content, top = 0, left = 0, right = 0, bottom = 0 }: PropsType) => {
  return (
    <RNTooltip
      popover={<TooltipText>{content}</TooltipText>}
      backgroundColor={theme.colors.background.default}
      withOverlay={false}
      withPointer={false}
      width='auto'
      containerStyle={{
        borderRadius: 8,
        padding: 8,
        flexShrink: 0,
        flexWrap: 'nowrap',
        marginTop: top,
        marginLeft: left,
        marginRight: right,
        marginBottom: bottom,
        boxShadow: '0px 0px 16px 0px rgba(255, 255, 255, 0.2)',
      }}
      actionType='press'
    >
      {children}
    </RNTooltip>
  )
}

export default CommonTooltip

const TooltipText = styled(Text)`
  font-size: ${`${theme.fontSizes.caption}px`};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.core.white};
`
