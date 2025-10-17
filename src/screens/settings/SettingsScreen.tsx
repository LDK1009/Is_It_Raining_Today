import { updateNotificationSchedule } from '@/services/notificationService'
import { useNotificationStore } from '@/stores/notificationStore'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SettingsScreen = () => {
  const { settings, updateSettings, loadSettings } = useNotificationStore()
  const [localSettings, setLocalSettings] = useState(settings)

  useEffect(() => {
    loadSettings()
  }, [])

  useEffect(() => {
    setLocalSettings(settings)
  }, [settings])

  const handleToggleNotification = (value: boolean) => {
    setLocalSettings(prev => ({ ...prev, isEnabled: value }))
  }

  const handleToggleDay = (day: number) => {
    setLocalSettings(prev => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter(d => d !== day)
        : [...prev.selectedDays, day]
    }))
  }

  const handleTimeChange = (time: string) => {
    setLocalSettings(prev => ({ ...prev, notificationTime: time }))
  }

  const handleThresholdChange = (threshold: number) => {
    setLocalSettings(prev => ({ ...prev, rainProbabilityThreshold: threshold }))
  }

  const handleSave = async () => {
    try {
      await updateSettings(localSettings)
      updateNotificationSchedule()
      Alert.alert('저장 완료', '설정이 저장되었습니다.')
    } catch (error) {
      Alert.alert('오류', '설정 저장에 실패했습니다.')
    }
  }

  const days = ['일', '월', '화', '수', '목', '금', '토']

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: theme.spacing.lg }}>
        <Header>
          <Title>설정 ⚙️</Title>
          <Subtitle>알림과 강수확률을 설정해보세요</Subtitle>
        </Header>

        <Section>
          <SectionTitle>알림 설정</SectionTitle>
          
          <SettingItem>
            <SettingLabel>알림 활성화</SettingLabel>
            <Switch
              value={localSettings.isEnabled}
              onValueChange={handleToggleNotification}
              trackColor={{ false: theme.colors.text.light, true: theme.colors.primary.light }}
              thumbColor={localSettings.isEnabled ? theme.colors.primary.main : theme.colors.text.secondary}
            />
          </SettingItem>

          <SettingItem>
            <SettingLabel>알림 요일</SettingLabel>
            <DaySelector>
              {days.map((day, index) => (
                <DayButton
                  key={index}
                  selected={localSettings.selectedDays.includes(index)}
                  onPress={() => handleToggleDay(index)}
                >
                  <DayButtonText selected={localSettings.selectedDays.includes(index)}>
                    {day}
                  </DayButtonText>
                </DayButton>
              ))}
            </DaySelector>
          </SettingItem>

          <SettingItem>
            <SettingLabel>알림 시간</SettingLabel>
            <TimeSelector>
              {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(time => (
                <TimeButton
                  key={time}
                  selected={localSettings.notificationTime === time}
                  onPress={() => handleTimeChange(time)}
                >
                  <TimeButtonText selected={localSettings.notificationTime === time}>
                    {time}
                  </TimeButtonText>
                </TimeButton>
              ))}
            </TimeSelector>
          </SettingItem>
        </Section>

        <Section>
          <SectionTitle>강수확률 설정</SectionTitle>
          
          <SettingItem>
            <SettingLabel>알림 기준 강수확률</SettingLabel>
            <ThresholdSelector>
              {[30, 40, 50, 60, 70, 80].map(threshold => (
                <ThresholdButton
                  key={threshold}
                  selected={localSettings.rainProbabilityThreshold === threshold}
                  onPress={() => handleThresholdChange(threshold)}
                >
                  <ThresholdButtonText selected={localSettings.rainProbabilityThreshold === threshold}>
                    {threshold}%
                  </ThresholdButtonText>
                </ThresholdButton>
              ))}
            </ThresholdSelector>
            <ThresholdDescription>
              설정한 강수확률 이상일 때 알림을 받습니다
            </ThresholdDescription>
          </SettingItem>
        </Section>

        <SaveButton onPress={handleSave}>
          <SaveButtonText>설정 저장</SaveButtonText>
        </SaveButton>
      </ScrollView>
    </Container>
  )
}

export default SettingsScreen

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.background.default};
`

const Header = styled(View)`
  align-items: center;
  margin-bottom: ${theme.spacing['2xl']};
`

const Title = styled(Text)`
  font-size: ${theme.fontSizes['4xl']};
  font-weight: ${theme.fontWeights.extraBold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
`

const Subtitle = styled(Text)`
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text.secondary};
  text-align: center;
`

const Section = styled(View)`
  background-color: ${theme.colors.background.paper};
  border-radius: ${theme.border.radius['2xl']};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
  /* shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
  elevation: 2; */
`

const SectionTitle = styled(Text)`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.lg};
`

const SettingItem = styled(View)`
  margin-bottom: ${theme.spacing.xl};
`

const SettingLabel = styled(Text)`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semiBold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`

const DaySelector = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`

const DayButton = styled(TouchableOpacity)<{ selected: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: ${theme.border.radius.full};
  background-color: ${props => props.selected ? theme.colors.primary.main : theme.colors.background.card};
  justify-content: center;
  align-items: center;
  border-width: ${theme.border.width.normal};
  border-color: ${props => props.selected ? theme.colors.primary.main : theme.colors.text.light};
`

const DayButtonText = styled(Text)<{ selected: boolean }>`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.semiBold};
  color: ${props => props.selected ? theme.colors.core.white : theme.colors.text.secondary};
`

const TimeSelector = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`

const TimeButton = styled(TouchableOpacity)<{ selected: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.border.radius.lg};
  background-color: ${props => props.selected ? theme.colors.primary.main : theme.colors.background.card};
  border-width: ${theme.border.width.normal};
  border-color: ${props => props.selected ? theme.colors.primary.main : theme.colors.text.light};
`

const TimeButtonText = styled(Text)<{ selected: boolean }>`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  color: ${props => props.selected ? theme.colors.core.white : theme.colors.text.secondary};
`

const ThresholdSelector = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`

const ThresholdButton = styled(TouchableOpacity)<{ selected: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.border.radius.lg};
  background-color: ${props => props.selected ? theme.colors.accent.blue : theme.colors.background.card};
  border-width: ${theme.border.width.normal};
  border-color: ${props => props.selected ? theme.colors.accent.blue : theme.colors.text.light};
`

const ThresholdButtonText = styled(Text)<{ selected: boolean }>`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  color: ${props => props.selected ? theme.colors.core.white : theme.colors.text.secondary};
`

const ThresholdDescription = styled(Text)`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.light};
  margin-top: ${theme.spacing.sm};
`

const SaveButton = styled(TouchableOpacity)`
  background-color: ${theme.colors.primary.main};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.border.radius['2xl']};
  align-items: center;
  margin-top: ${theme.spacing.lg};
  /* shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 5; */
`

const SaveButtonText = styled(Text)`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.core.white};
`
