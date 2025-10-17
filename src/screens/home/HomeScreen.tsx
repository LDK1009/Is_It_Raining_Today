import WeatherCard from '@/components/display/WeatherCard'
import { WeatherData, getWeatherForecast } from '@/services/api/weatherService'
import { getCurrentLocation } from '@/services/locationService'
import { checkRainProbability, sendRainAlertNotification } from '@/services/notificationService'
import { useNotificationStore } from '@/stores/notificationStore'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React, { useEffect, useState } from 'react'
import { Alert, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { settings } = useNotificationStore()

  const loadWeatherData = async () => {
    try {
      setIsLoading(true)
      
      // 현재 위치 가져오기
      const location = await getCurrentLocation()
      
      // 날씨 정보 가져오기
      const weather = await getWeatherForecast(location.latitude, location.longitude)
      
      setWeatherData(weather)
      
      // 강수확률 체크 및 알림
      if (settings.isEnabled && checkRainProbability(weather, settings.rainProbabilityThreshold)) {
        const todayRainProbability = Math.round((weather.daily[0]?.pop || 0) * 100)
        await sendRainAlertNotification(todayRainProbability)
      }
    } catch (error) {
      console.error('날씨 데이터 로드 실패:', error)
      Alert.alert('오류', '날씨 정보를 가져올 수 없습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const onRefresh = async () => {
    setIsRefreshing(true)
    await loadWeatherData()
    setIsRefreshing(false)
  }

  useEffect(() => {
    loadWeatherData()
  }, [])

  if (isLoading) {
    return (
      <Container>
        <LoadingContainer>
          <LoadingText>날씨 정보를 가져오는 중...</LoadingText>
        </LoadingContainer>
      </Container>
    )
  }

  if (!weatherData) {
    return (
      <Container>
        <ErrorContainer>
          <ErrorText>날씨 정보를 불러올 수 없습니다</ErrorText>
          <RetryButton onPress={loadWeatherData}>
            <RetryButtonText>다시 시도</RetryButtonText>
          </RetryButton>
        </ErrorContainer>
      </Container>
    )
  }

  const todayRainProbability = Math.round((weatherData.daily[0]?.pop || 0) * 100)

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <Header>
          <Title>오늘 비 오나? 🌧️</Title>
          <Subtitle>귀여운 솜사탕과 함께 날씨를 확인해보세요</Subtitle>
        </Header>

        <WeatherCard
          location={weatherData.location.name}
          temperature={{
            current: weatherData.current.temp,
            min: weatherData.daily[0]?.temp.min || weatherData.current.temp,
            max: weatherData.daily[0]?.temp.max || weatherData.current.temp,
          }}
          rainProbability={todayRainProbability}
          weatherDescription={weatherData.current.weather.description}
          weatherMain={weatherData.current.weather.main}
        />

        <RainAlertSection>
          <RainAlertTitle>비 예보 알림</RainAlertTitle>
          <RainAlertText>
            {todayRainProbability >= settings.rainProbabilityThreshold
              ? `🌧️ 강수확률 ${todayRainProbability}%로 비가 올 예정입니다!`
              : `☀️ 강수확률 ${todayRainProbability}%로 맑은 날씨입니다.`}
          </RainAlertText>
        </RainAlertSection>
      </ScrollView>
    </Container>
  )
}

export default HomeScreen

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.background.default};
`

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const LoadingText = styled(Text)`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text.secondary};
`

const ErrorContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing['2xl']};
`

const ErrorText = styled(Text)`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`

const RetryButton = styled(TouchableOpacity)`
  background-color: ${theme.colors.primary.main};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.border.radius.lg};
`

const RetryButtonText = styled(Text)`
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.semiBold};
  color: ${theme.colors.core.white};
`

const Header = styled(View)`
  padding: ${theme.spacing['2xl']} ${theme.spacing.lg} ${theme.spacing.lg};
  align-items: center;
`

const Title = styled(Text)`
  font-size: ${theme.fontSizes['4xl']};
  font-weight: ${theme.fontWeights.extraBold};
  color: ${theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${theme.spacing.sm};
`

const Subtitle = styled(Text)`
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text.secondary};
  text-align: center;
`

const RainAlertSection = styled(View)`
  background-color: ${theme.colors.background.paper};
  margin: ${theme.spacing.lg};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.border.radius['2xl']};
  /* shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
  elevation: 2; */
`

const RainAlertTitle = styled(Text)`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
`

const RainAlertText = styled(Text)`
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text.secondary};
  line-height: 22px;
`
