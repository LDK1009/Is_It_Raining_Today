import axios from 'axios'

// OpenWeatherMap API 설정
const WEATHER_API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY || 'your_api_key_here'
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5'

// 날씨 API 클라이언트
const weatherClient = axios.create({
  baseURL: WEATHER_BASE_URL,
  timeout: 10000,
})

// 날씨 데이터 타입 정의
export interface WeatherData {
  location: {
    name: string
    country: string
    lat: number
    lon: number
  }
  current: {
    temp: number
    feels_like: number
    humidity: number
    pressure: number
    visibility: number
    uv_index: number
    wind_speed: number
    wind_deg: number
    weather: {
      main: string
      description: string
      icon: string
    }
  }
  daily: Array<{
    dt: number
    temp: {
      min: number
      max: number
    }
    pop: number // 강수확률 (0-1)
    weather: {
      main: string
      description: string
      icon: string
    }
  }>
}

// 현재 위치의 날씨 정보 가져오기
export async function getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
  try {
    const response = await weatherClient.get('/weather', {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units: 'metric',
        lang: 'kr',
      },
    })

    return {
      location: {
        name: response.data.name,
        country: response.data.sys.country,
        lat: response.data.coord.lat,
        lon: response.data.coord.lon,
      },
      current: {
        temp: Math.round(response.data.main.temp),
        feels_like: Math.round(response.data.main.feels_like),
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        visibility: response.data.visibility,
        uv_index: 0, // UV 인덱스는 별도 API 필요
        wind_speed: response.data.wind.speed,
        wind_deg: response.data.wind.deg,
        weather: {
          main: response.data.weather[0].main,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
        },
      },
      daily: [], // 일일 예보는 별도 API 호출 필요
    }
  } catch (error) {
    console.error('날씨 정보를 가져오는데 실패했습니다:', error)
    throw new Error('날씨 정보를 가져올 수 없습니다.')
  }
}

// 5일간 날씨 예보 가져오기
export async function getWeatherForecast(lat: number, lon: number): Promise<WeatherData> {
  try {
    const response = await weatherClient.get('/forecast', {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units: 'metric',
        lang: 'kr',
      },
    })

    // 현재 날씨 정보
    const currentResponse = await getCurrentWeather(lat, lon)

    // 5일간 예보 데이터 처리
    const dailyForecast = response.data.list
      .filter((item: any, index: number) => index % 8 === 0) // 24시간마다 한 번씩
      .slice(0, 5)
      .map((item: any) => ({
        dt: item.dt,
        temp: {
          min: Math.round(item.main.temp_min),
          max: Math.round(item.main.temp_max),
        },
        pop: item.pop, // 강수확률
        weather: {
          main: item.weather[0].main,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        },
      }))

    return {
      ...currentResponse,
      daily: dailyForecast,
    }
  } catch (error) {
    console.error('날씨 예보를 가져오는데 실패했습니다:', error)
    throw new Error('날씨 예보를 가져올 수 없습니다.')
  }
}

// 도시명으로 날씨 정보 검색
export async function getWeatherByCity(cityName: string): Promise<WeatherData> {
  try {
    const response = await weatherClient.get('/weather', {
      params: {
        q: cityName,
        appid: WEATHER_API_KEY,
        units: 'metric',
        lang: 'kr',
      },
    })

    return getCurrentWeather(response.data.coord.lat, response.data.coord.lon)
  } catch (error) {
    console.error('도시 날씨 정보를 가져오는데 실패했습니다:', error)
    throw new Error('해당 도시의 날씨 정보를 찾을 수 없습니다.')
  }
}

// 강수확률 체크 함수
export function checkRainProbability(weatherData: WeatherData, threshold: number): boolean {
  // 현재 시간대의 강수확률 체크
  const currentPop = weatherData.daily[0]?.pop || 0
  return currentPop >= threshold / 100 // threshold는 0-100 사이의 값
}

// 날씨 상태에 따른 아이콘 매핑
export function getWeatherIcon(weatherMain: string): string {
  const iconMap: { [key: string]: string } = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Fog': '🌫️',
    'Haze': '🌫️',
  }
  return iconMap[weatherMain] || '🌤️'
}

// 날씨 상태에 따른 배경색 매핑
export function getWeatherBackgroundColor(weatherMain: string): string {
  const colorMap: { [key: string]: string } = {
    'Clear': '#FEF3C7', // 맑음 - 연한 노랑
    'Clouds': '#E5E7EB', // 흐림 - 연한 회색
    'Rain': '#DBEAFE', // 비 - 연한 파랑
    'Drizzle': '#DBEAFE', // 이슬비 - 연한 파랑
    'Thunderstorm': '#E0E7FF', // 뇌우 - 연한 보라
    'Snow': '#F0F9FF', // 눈 - 연한 하늘색
    'Mist': '#F3F4F6', // 안개 - 연한 회색
    'Fog': '#F3F4F6', // 안개 - 연한 회색
    'Haze': '#F3F4F6', // 안개 - 연한 회색
  }
  return colorMap[weatherMain] || '#F8FAFC'
}
