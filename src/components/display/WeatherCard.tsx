import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React from 'react'
import { Text, View } from 'react-native'
import WeatherCottonCandy from './WeatherCottonCandy'

interface WeatherCardProps {
  location: string
  temperature: {
    current: number
    min: number
    max: number
  }
  rainProbability: number
  weatherDescription: string
  weatherMain: string
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  location,
  temperature,
  rainProbability,
  weatherDescription,
  weatherMain,
}) => {
  const getWeatherType = (main: string): 'sunny' | 'cloudy' | 'rainy' | 'snowy' => {
    switch (main) {
      case 'Clear':
        return 'sunny'
      case 'Clouds':
        return 'cloudy'
      case 'Rain':
      case 'Drizzle':
      case 'Thunderstorm':
        return 'rainy'
      case 'Snow':
        return 'snowy'
      default:
        return 'cloudy'
    }
  }

  const getRainProbabilityColor = (probability: number) => {
    if (probability >= 70) return theme.colors.status.error
    if (probability >= 50) return theme.colors.status.warning
    if (probability >= 30) return theme.colors.accent.blue
    return theme.colors.text.secondary
  }

  return (
    <Container>
      <Header>
        <LocationText>{location}</LocationText>
        <WeatherCottonCandy 
          weatherType={getWeatherType(weatherMain)} 
          size={100}
        />
      </Header>
      
      <WeatherInfo>
        <TemperatureSection>
          <CurrentTemperature>{temperature.current}°</CurrentTemperature>
          <TemperatureRange>
            {temperature.min}° / {temperature.max}°
          </TemperatureRange>
        </TemperatureSection>
        
        <WeatherDetails>
          <WeatherDescription>{weatherDescription}</WeatherDescription>
          
          <RainProbabilitySection>
            <RainProbabilityLabel>강수확률</RainProbabilityLabel>
            <RainProbabilityValue 
              color={getRainProbabilityColor(rainProbability)}
            >
              {rainProbability}%
            </RainProbabilityValue>
          </RainProbabilitySection>
        </WeatherDetails>
      </WeatherInfo>
    </Container>
  )
}

export default WeatherCard

const Container = styled(View)`
  background-color: ${theme.colors.background.paper};
  border-radius: ${theme.border.radius['2xl']};
  padding: ${theme.spacing['2xl']};
  margin: ${theme.spacing.lg};
  /* shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 5; */
`

const Header = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
`

const LocationText = styled(Text)`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.text.primary};
  flex: 1;
`

const WeatherInfo = styled(View)`
  gap: ${theme.spacing.lg};
`

const TemperatureSection = styled(View)`
  align-items: center;
`

const CurrentTemperature = styled(Text)`
  font-size: ${theme.fontSizes['5xl']};
  font-weight: ${theme.fontWeights.extraBold};
  color: ${theme.colors.text.primary};
  line-height: 60px;
`

const TemperatureRange = styled(Text)`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text.secondary};
`

const WeatherDetails = styled(View)`
  gap: ${theme.spacing.md};
`

const WeatherDescription = styled(Text)`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text.primary};
  text-align: center;
`

const RainProbabilitySection = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.colors.background.card};
  padding: ${theme.spacing.md};
  border-radius: ${theme.border.radius.lg};
`

const RainProbabilityLabel = styled(Text)`
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text.secondary};
`

const RainProbabilityValue = styled(Text)<{ color: string }>`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${props => props.color};
`
