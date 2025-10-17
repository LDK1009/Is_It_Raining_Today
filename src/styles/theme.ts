// 색상
export const colors = {
  primary: {
    dark: '#2a2ac7',
    main: '#3f3ff3',
    light: '#7a7af5',
  },
  secondary: {
    dark: '#e91e63',
    main: '#ff4081',
    light: '#ff79b0',
  },
  background: {
    default: '#000000',
    paper: '#222222',
  },
  black: {
    100: '#000000',
    200: '#1C1C1E',
    300: '#2C2C2E',
    400: '#3A3A3C',
    500: '#48484A',
    600: '#636366',
    700: '#8E8E93',
    800: '#C7C7CC',
    900: '#E5E5EA',
  },
  status: {
    info: '#0A84FF', // 정보/버튼 강조
    success: '#34C759', // 성공 (iOS 스타일)
    warning: '#FF9500', // 경고
    error: '#FF3B30', // 에러
  },
  core: {
    white: '#FFFFFF',
    black: '#000000',
  },
}

// 폰트 사이즈
export const fontSizes = {
  meta: 8,
  caption: 12,
  body: 14,
  subtitle: 16,
  title: 18,
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

// 간격 (padding, margin)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
}

// 테두리
export const border = {
  radius: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    full: 9999,
  },
  width: {
    thin: 1,
    thick: 2,
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

// 폰트 weight
export const fontWeights = {
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
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
