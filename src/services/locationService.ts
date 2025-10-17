import * as Location from 'expo-location'
import { Alert } from 'react-native'

// 위치 정보 타입 정의
export interface LocationData {
  latitude: number
  longitude: number
  address?: string
}

// 위치 권한 요청 및 현재 위치 가져오기
export async function getCurrentLocation(): Promise<LocationData> {
  try {
    // 위치 권한 상태 확인
    const { status } = await Location.getForegroundPermissionsAsync()
    
    if (status !== 'granted') {
      // 위치 권한 요청
      const permissionResult = await Location.requestForegroundPermissionsAsync()
      
      if (permissionResult.status !== 'granted') {
        Alert.alert(
          '위치 권한 필요',
          '날씨 정보를 제공하기 위해 위치 권한이 필요합니다.',
          [{ text: '확인' }]
        )
        throw new Error('위치 권한이 거부되었습니다.')
      }
    }

    // 현재 위치 가져오기
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    })

    // 주소 정보 가져오기 (선택사항)
    let address: string | undefined
    try {
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
      
      if (reverseGeocode.length > 0) {
        const addr = reverseGeocode[0]
        address = `${addr.city || addr.district || ''} ${addr.street || ''}`.trim()
      }
    } catch (error) {
      console.warn('주소 정보를 가져올 수 없습니다:', error)
    }

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      address,
    }
  } catch (error) {
    console.error('위치 정보를 가져오는데 실패했습니다:', error)
    throw new Error('위치 정보를 가져올 수 없습니다.')
  }
}

// 위치 권한 상태 확인
export async function checkLocationPermission(): Promise<boolean> {
  try {
    const { status } = await Location.getForegroundPermissionsAsync()
    return status === 'granted'
  } catch (error) {
    console.error('위치 권한 확인 실패:', error)
    return false
  }
}

// 위치 권한 요청
export async function requestLocationPermission(): Promise<boolean> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync()
    return status === 'granted'
  } catch (error) {
    console.error('위치 권한 요청 실패:', error)
    return false
  }
}

// 위치 서비스 활성화 상태 확인
export async function isLocationEnabled(): Promise<boolean> {
  try {
    const enabled = await Location.hasServicesEnabledAsync()
    return enabled
  } catch (error) {
    console.error('위치 서비스 상태 확인 실패:', error)
    return false
  }
}
