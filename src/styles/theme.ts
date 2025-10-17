// 색상 - 한국형 UI/UX를 위한 Pastel Colors
export const colors = {
  primary: {
    dark: '#6366F1', // 인디고
    main: '#8B5CF6', // 보라
    light: '#A78BFA', // 연한 보라
  },
  secondary: {
    dark: '#EC4899', // 핑크
    main: '#F472B6', // 연한 핑크
    light: '#FBBF24', // 노랑
  },
  background: {
    default: '#FEF7FF', // 연한 라벤더
    paper: '#FFFFFF', // 순백
    card: '#F8FAFC', // 연한 회색
  },
  weather: {
    sunny: '#FEF3C7', // 맑음 - 연한 노랑
    cloudy: '#E5E7EB', // 흐림 - 연한 회색
    rainy: '#DBEAFE', // 비 - 연한 파랑
    snowy: '#F0F9FF', // 눈 - 연한 하늘색
  },
  text: {
    primary: '#1F2937', // 진한 회색
    secondary: '#6B7280', // 중간 회색
    light: '#9CA3AF', // 연한 회색
    white: '#FFFFFF',
  },
  accent: {
    blue: '#3B82F6', // 파랑
    green: '#10B981', // 초록
    orange: '#F59E0B', // 주황
    purple: '#8B5CF6', // 보라
    pink: '#EC4899', // 핑크
  },
  status: {
    info: '#3B82F6', // 정보
    success: '#10B981', // 성공
    warning: '#F59E0B', // 경고
    error: '#EF4444', // 에러
  },
  core: {
    white: '#FFFFFF',
    black: '#000000',
  },
}

// 폰트 사이즈 - 한국형 UI에 맞게 조정
export const fontSizes = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
}

// 아이콘 크기
export const iconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  xxl: 40,
}

// 간격 (padding, margin) - 한국형 UI에 맞게 조정
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
}

// 테두리 - Rounded Corners 강조
export const border = {
  radius: {
    xs: 6,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },
  width: {
    thin: 1,
    normal: 2,
    thick: 3,
  },
}

// zIndex 계층
export const zIndices = {
  background: -1,
  base: 0,
  dropdown: 10,
  modal: 100,
  toast: 200,
}

// 폰트 weight - 한국형 UI에 맞게 조정
export const fontWeights = {
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
}

// 통합 테마
export const theme = {
  colors,
  fontSizes,
  fontWeights,
  spacing,
  border,
  iconSizes,
  zIndices,
}
