// lib/supabaseClient.ts
// -------------------------------------------------------------
// 목적: Supabase 클라이언트를 안전하게 생성 (릴리스/OTA/디버그 공통)
// 핵심: EXPO_PUBLIC_ 접두 env를 process.env로 직접 참조
// -------------------------------------------------------------
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto'; // RN에서 URL/fetch 관련 호환성 보정

// 1) EXPO_PUBLIC_ 접두 env를 "직접" 읽는다.
//    - Expo는 번들 시점에 이 값을 코드에 인라인한다.
//    - app.config.js의 extra를 거치지 않으므로 런타임 유실/다름 문제 방지.
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// 2) 방어 코드: 빌드/런타임 어디서든 즉시 원인 파악 가능하게
function isValidUrl(u?: string) {
  if (!u) return false;
  try {
    // 유효하지 않은 값이면 여기서 예외가 난다.
    new URL(u);
    return true;
  } catch {
    return false;
  }
}

if (!isValidUrl(SUPABASE_URL)) {
  // ❗ 릴리스에서도 메시지가 명확히 보이도록 에러를 던진다.
  //    adb logcat / Crashlytics / Sentry에서 원인 추적이 쉬워짐.
  throw new Error(
    `Supabase URL invalid: "${String(SUPABASE_URL)}". ` +
      `Check EXPO_PUBLIC_SUPABASE_URL (must start with http/https).`
  );
}

if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY.length < 20) {
  throw new Error(
    `Supabase anon key is missing or too short. ` +
      `Set EXPO_PUBLIC_SUPABASE_ANON_KEY correctly.`
  );
}

// 3) 클라이언트 생성
export const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
  auth: {
    storage: AsyncStorage,          // RN에서 세션 유지
    autoRefreshToken: true,         // 토큰 자동 갱신
    persistSession: true,           // 앱 재시작해도 세션 유지
    detectSessionInUrl: false,      // RN에서는 필요 없음
  },
});
