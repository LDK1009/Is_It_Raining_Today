# 오늘 비 오나? 🌧️

귀여운 솜사탕과 함께 날씨를 확인하는 한국형 날씨 앱입니다.

## 주요 기능

- 🌧️ **강수확률 알림**: 설정한 강수확률 이상일 때 푸시 알림
- 📍 **위치 기반 날씨**: 현재 위치의 실시간 날씨 정보
- 🍭 **귀여운 솜사탕**: 날씨별로 다른 색상의 솜사탕 이미지
- ⚙️ **맞춤 설정**: 알림 시간, 요일, 강수확률 기준 설정
- 🎨 **한국형 UI/UX**: Pastel Colors와 Rounded Corners 적용

## 기술 스택

- [Expo](https://expo.dev) - React Native 프레임워크
- [TypeScript](https://www.typescriptlang.org/) - 타입 안전성
- [Expo Router](https://expo.github.io/router/) - 파일 기반 라우팅
- [Zustand](https://zustand-demo.pmnd.rs/) - 상태 관리
- [Emotion](https://emotion.sh/) - CSS-in-JS 스타일링
- [OpenWeatherMap API](https://openweathermap.org/) - 날씨 데이터
- [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/) - 위치 서비스
- [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) - 푸시 알림

## 설치 및 실행

### 필요 조건

- [Node.js](https://nodejs.org/) (버전 18 이상)
- [npm](https://www.npmjs.com/) 또는 [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### 설치

1. 저장소 클론:
```bash
git clone <repository-url>
cd Is_It_Raining_Today
```

2. 의존성 설치:
```bash
npm install
```

3. 환경 변수 설정:
```bash
# env.example 파일을 .env로 복사하고 OpenWeatherMap API 키 설정
cp env.example .env
```

4. 개발 서버 시작:
```bash
npm start
```

## 환경 변수 설정

`.env` 파일에 다음 변수를 설정하세요:

```env
EXPO_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key_here
```

OpenWeatherMap API 키는 [여기서](https://openweathermap.org/api) 무료로 발급받을 수 있습니다.

## 사용 가능한 스크립트

- `npm start` - Expo 개발 서버 시작
- `npm run android` - Android 디바이스/에뮬레이터에서 실행
- `npm run ios` - iOS 디바이스/시뮬레이터에서 실행
- `npm run web` - 웹 브라우저에서 실행
- `npm run lint` - ESLint 실행
- `npm run lint:fix` - ESLint 오류 수정
- `npm run format` - Prettier로 코드 포맷팅
- `npm run type-check` - TypeScript 타입 체크

## 프로젝트 구조

```
Is_It_Raining_Today/
├── app/                    # App Router 페이지
│   ├── _layout.tsx        # 루트 레이아웃
│   ├── index.tsx          # 홈 화면
│   └── settings.tsx       # 설정 화면
├── src/                    # 소스 코드
│   ├── components/         # 재사용 가능한 컴포넌트
│   │   ├── display/       # 표시 컴포넌트
│   │   ├── feedback/      # 피드백 컴포넌트
│   │   └── input/         # 입력 컴포넌트
│   ├── services/           # API 및 외부 서비스
│   │   ├── api/           # 날씨 API
│   │   ├── auth/          # 인증 서비스
│   │   └── locationService.ts
│   ├── stores/             # 상태 관리
│   │   └── notificationStore.ts
│   ├── styles/             # 스타일링 및 테마
│   │   └── theme.ts       # 한국형 UI 테마
│   └── screens/            # 화면 컴포넌트
│       ├── home/          # 홈 화면
│       └── settings/      # 설정 화면
├── assets/                 # 정적 자산
└── scripts/                # 빌드 및 유틸리티 스크립트
```

## 주요 컴포넌트

### WeatherCottonCandy
날씨별로 다른 색상의 귀여운 솜사탕 이미지를 표시하는 컴포넌트입니다.

### WeatherCard
현재 위치, 온도, 강수확률, 날씨 정보를 카드 형태로 표시하는 컴포넌트입니다.

### SettingsScreen
알림 설정, 강수확률 기준, 알림 시간 등을 설정할 수 있는 화면입니다.

## 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.
