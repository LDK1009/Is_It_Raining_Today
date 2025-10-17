import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React from 'react'
import { View } from 'react-native'

interface WeatherCottonCandyProps {
  weatherType: 'sunny' | 'cloudy' | 'rainy' | 'snowy'
  size?: number
}

const WeatherCottonCandy: React.FC<WeatherCottonCandyProps> = ({ 
  weatherType, 
  size = 120 
}) => {
  const getCottonCandyColor = () => {
    switch (weatherType) {
      case 'sunny':
        return '#FEF3C7' // 연한 노랑
      case 'cloudy':
        return '#E5E7EB' // 연한 회색
      case 'rainy':
        return '#DBEAFE' // 연한 파랑
      case 'snowy':
        return '#F0F9FF' // 연한 하늘색
      default:
        return '#F8FAFC'
    }
  }

  const getWeatherEmoji = () => {
    switch (weatherType) {
      case 'sunny':
        return '☀️'
      case 'cloudy':
        return '☁️'
      case 'rainy':
        return '🌧️'
      case 'snowy':
        return '❄️'
      default:
        return '🌤️'
    }
  }

  return (
    <Container size={size}>
      {/* 솜사탕 몸체 */}
      <CottonCandyBody color={getCottonCandyColor()} />
      <CottonCandyBody2 color={getCottonCandyColor()} />
      <CottonCandyBody3 color={getCottonCandyColor()} />
      
      {/* 솜사탕 막대 */}
      <Stick />
      
      {/* 날씨 이모지 */}
      <WeatherEmoji>{getWeatherEmoji()}</WeatherEmoji>
      
      {/* 장식 요소들 */}
      <Decoration1 />
      <Decoration2 />
      <Decoration3 />
    </Container>
  )
}

export default WeatherCottonCandy

const Container = styled(View)<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  position: relative;
  align-items: center;
  justify-content: center;
`

const CottonCandyBody = styled(View)<{ color: string }>`
  position: absolute;
  width: 80px;
  height: 80px;
  background-color: ${props => props.color};
  border-radius: 50px;
  top: 10px;
  opacity: 0.8;
  /* shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3; */
`

const CottonCandyBody2 = styled(View)<{ color: string }>`
  position: absolute;
  width: 60px;
  height: 60px;
  background-color: ${props => props.color};
  border-radius: 30px;
  top: 20px;
  left: 10px;
  opacity: 0.9;
  /* shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3; */
`

const CottonCandyBody3 = styled(View)<{ color: string }>`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: ${props => props.color};
  border-radius: 25px;
  top: 30px;
  right: 10px;
  opacity: 0.7;
  /* shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3; */
`

const Stick = styled(View)`
  position: absolute;
  width: 4px;
  height: 60px;
  background-color: #8B4513;
  border-radius: 2px;
  bottom: 0;
  /* shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  elevation: 2; */
`

const WeatherEmoji = styled(View)`
  position: absolute;
  top: 35px;
  font-size: 24px;
  z-index: 10;
`

const Decoration1 = styled(View)`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: ${theme.colors.accent.pink};
  border-radius: 4px;
  top: 15px;
  right: 20px;
  opacity: 0.6;
`

const Decoration2 = styled(View)`
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: ${theme.colors.accent.blue};
  border-radius: 3px;
  top: 25px;
  left: 15px;
  opacity: 0.7;
`

const Decoration3 = styled(View)`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: ${theme.colors.accent.purple};
  border-radius: 5px;
  top: 40px;
  left: 5px;
  opacity: 0.5;
`
