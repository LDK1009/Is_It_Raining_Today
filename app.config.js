/**
 * app.config.js
 * =============================================================================
 * 
 * 📱 Expo 앱 설정 파일
 * 
 * 이 파일은 Expo 앱의 전체적인 설정을 관리합니다:
 * - 앱 메타데이터 (이름, 버전, 아이콘 등)
 * - 플랫폼별 설정 (iOS, Android, Web)
 * - OTA 업데이트 설정
 * - 플러그인 및 실험적 기능 설정
 * 
 * 🔧 주요 변경사항:
 * - Supabase 환경변수는 더 이상 여기서 주입하지 않음
 * - JS 코드에서 process.env.EXPO_PUBLIC_*를 직접 사용하여 혼선 방지
 * - OTA 업데이트를 위한 runtimeVersion 설정 포함
 * 
 * =============================================================================
 */

// dotenv 설정을 로드하여 환경변수를 사용할 수 있게 함
import 'dotenv/config'

export default {
  expo: {
    // 📱 앱 기본 정보
    name: '주식고사',                    // 앱 스토어에 표시될 앱 이름
    slug: 'stock-exam',                 // Expo 프로젝트 고유 식별자 (URL 친화적)
    version: '1.0.0',                   // 앱 버전 (앱 스토어 업데이트시 증가)

    // 🔄 OTA(Over-The-Air) 업데이트 설정
    // 앱 스토어 업데이트 없이 JavaScript 번들을 실시간으로 업데이트할 수 있음
    updates: {
      // EAS Update 서비스 URL - 프로젝트별 고유 주소
      url: 'https://u.expo.dev/21f2a9db-2523-4ff3-b912-672e555bf3b8',
    },

    // 🎨 UI/UX 설정
    orientation: 'portrait',            // 화면 방향 고정 (세로 모드만)
    icon: './assets/images/icon.png',   // 앱 아이콘 경로
    scheme: 'stockexam',                // 딥링크용 URL 스키마 (stockexam://...)
    userInterfaceStyle: 'automatic',    // 다크/라이트 모드 자동 감지
    newArchEnabled: true,               // React Native 새로운 아키텍처 활성화

    // 🍎 iOS 플랫폼 설정
    ios: {
      supportsTablet: true,                           // iPad 지원 여부
      bundleIdentifier: 'com.stockexam.app',         // iOS 앱 고유 식별자 (앱 스토어)
      
      // 🔄 iOS OTA 업데이트 정책
      // appVersion 기반: app.json의 version과 동일한 runtimeVersion 사용
      // 같은 runtimeVersion끼리만 OTA 업데이트 가능
      runtimeVersion: { policy: 'appVersion' },
    },

    // 🤖 Android 플랫폼 설정
    android: {
      // 적응형 아이콘 설정 (Android 8.0+)
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',  // 전경 이미지
        backgroundColor: '#ffffff',                            // 배경색
      },
      package: 'com.stockexam.app',                   // Android 패키지명 (Google Play)
      edgeToEdgeEnabled: true,                        // 전체 화면 모드 (상태바/네비바까지 사용)
      
      // 🔄 Android OTA 업데이트 버전
      // 문자열로 고정: 같은 runtimeVersion을 가진 빌드끼리만 OTA 업데이트 가능
      // 주의: 이 값을 변경하면 이전 버전과 호환되지 않음
      runtimeVersion: '1.0.0',
    },

    // 🌐 웹 플랫폼 설정 (Expo Web)
    web: {
      bundler: 'metro',                              // Metro 번들러 사용 (React Native와 동일)
      output: 'static',                              // 정적 파일로 빌드 (SSG)
      favicon: './assets/images/favicon.png',        // 웹 파비콘
    },

    // 🔌 Expo 플러그인 설정
    // 네이티브 코드 수정 없이 기능을 추가할 수 있는 플러그인들
    plugins: [
      // 파일 기반 라우팅 시스템 (app/ 폴더 구조 기반)
      'expo-router',
      
      // 스플래시 스크린 설정
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',   // 스플래시 화면 이미지
          imageWidth: 200,                            // 이미지 너비 (픽셀)
          resizeMode: 'contain',                      // 이미지 크기 조정 방식
          backgroundColor: '#000000',                 // 스플래시 화면 배경색
        },
      ],
    ],

    // 🧪 실험적 기능 설정
    experiments: { 
      typedRoutes: true,                             // TypeScript 라우트 타입 자동 생성
    },

    // 📦 추가 설정 및 메타데이터
    extra: {
      // EAS (Expo Application Services) 프로젝트 ID
      // ❌ 주의: Supabase 환경변수는 더 이상 여기서 전달하지 않음
      // ✅ 대신 process.env.EXPO_PUBLIC_* 방식을 사용하여 보안성과 명확성 향상
      eas: { projectId: '21f2a9db-2523-4ff3-b912-672e555bf3b8' },
    },
  },
}
