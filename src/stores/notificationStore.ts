import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'

// 알림 설정 타입 정의
export interface NotificationSettings {
  isEnabled: boolean
  selectedDays: number[] // 0: 일요일, 1: 월요일, ..., 6: 토요일
  notificationTime: string // HH:MM 형식
  rainProbabilityThreshold: number // 0-100 사이의 값
  lastNotificationDate?: string // 마지막 알림 날짜
}

// 알림 설정 스토어
interface NotificationStore {
  settings: NotificationSettings
  isLoading: boolean
  
  // 액션들
  loadSettings: () => Promise<void>
  saveSettings: (settings: NotificationSettings) => Promise<void>
  updateSettings: (updates: Partial<NotificationSettings>) => Promise<void>
  resetSettings: () => Promise<void>
}

const defaultSettings: NotificationSettings = {
  isEnabled: true,
  selectedDays: [1, 2, 3, 4, 5], // 월-금
  notificationTime: '08:00',
  rainProbabilityThreshold: 50,
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  settings: defaultSettings,
  isLoading: false,

  loadSettings: async () => {
    set({ isLoading: true })
    try {
      const stored = await AsyncStorage.getItem('notificationSettings')
      if (stored) {
        const settings = JSON.parse(stored)
        set({ settings: { ...defaultSettings, ...settings } })
      }
    } catch (error) {
      console.error('알림 설정을 불러오는데 실패했습니다:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  saveSettings: async (settings: NotificationSettings) => {
    set({ isLoading: true })
    try {
      await AsyncStorage.setItem('notificationSettings', JSON.stringify(settings))
      set({ settings })
    } catch (error) {
      console.error('알림 설정을 저장하는데 실패했습니다:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  updateSettings: async (updates: Partial<NotificationSettings>) => {
    const currentSettings = get().settings
    const newSettings = { ...currentSettings, ...updates }
    await get().saveSettings(newSettings)
  },

  resetSettings: async () => {
    await get().saveSettings(defaultSettings)
  },
}))
