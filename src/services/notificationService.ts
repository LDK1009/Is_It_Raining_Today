import { useNotificationStore } from '@/stores/notificationStore'
import * as Notifications from 'expo-notifications'

// 알림 설정
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

// 알림 권한 요청
export async function requestNotificationPermission(): Promise<boolean> {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      console.log('알림 권한이 거부되었습니다.')
      return false
    }

    return true
  } catch (error) {
    console.error('알림 권한 요청 실패:', error)
    return false
  }
}

// 알림 스케줄링
export async function scheduleRainNotification(): Promise<void> {
  try {
    const hasPermission = await requestNotificationPermission()
    if (!hasPermission) return

    const { settings } = useNotificationStore.getState()
    
    if (!settings.isEnabled) return

    // 기존 알림 취소
    await Notifications.cancelAllScheduledNotificationsAsync()

    // 선택된 요일들에 대해 알림 스케줄링
    for (const dayOfWeek of settings.selectedDays) {
      const [hours, minutes] = settings.notificationTime.split(':').map(Number)
      
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🌧️ 오늘 비 오나?',
          body: '강수확률을 확인해보세요!',
          sound: true,
        },
        trigger: {
          weekday: dayOfWeek + 1, // expo-notifications는 1부터 시작 (1=일요일)
          hour: hours,
          minute: minutes,
          repeats: true,
        },
      })
    }
  } catch (error) {
    console.error('알림 스케줄링 실패:', error)
  }
}

// 즉시 알림 보내기 (강수확률이 높을 때)
export async function sendRainAlertNotification(rainProbability: number): Promise<void> {
  try {
    const hasPermission = await requestNotificationPermission()
    if (!hasPermission) return

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🌧️ 오늘 비 온다!',
        body: `강수확률 ${rainProbability}%로 비가 올 예정입니다. 우산을 챙기세요!`,
        sound: true,
      },
      trigger: null, // 즉시 발송
    })
  } catch (error) {
    console.error('비 알림 발송 실패:', error)
  }
}

// 알림 취소
export async function cancelAllNotifications(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync()
  } catch (error) {
    console.error('알림 취소 실패:', error)
  }
}

// 알림 권한 상태 확인
export async function checkNotificationPermission(): Promise<boolean> {
  try {
    const { status } = await Notifications.getPermissionsAsync()
    return status === 'granted'
  } catch (error) {
    console.error('알림 권한 확인 실패:', error)
    return false
  }
}

// 강수확률 체크 함수
export function checkRainProbability(weatherData: any, threshold: number): boolean {
  // 현재 시간대의 강수확률 체크
  const currentPop = weatherData.daily[0]?.pop || 0
  return currentPop >= threshold / 100 // threshold는 0-100 사이의 값
}

// 알림 설정 업데이트 시 스케줄링 재설정
export function updateNotificationSchedule(): void {
  scheduleRainNotification()
}
