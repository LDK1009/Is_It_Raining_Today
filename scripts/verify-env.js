// scripts/verify-env.js
// -------------------------------------------------------------
// 목적: 빌드/업데이트 전에 필수 ENV 유효성 검사
// 로컬에서는 .env를 읽고, EAS 서버에서는 EAS 주입 ENV를 사용
// -------------------------------------------------------------
require('dotenv').config(); // ⬅️ 로컬에서 .env 읽기 (EAS 서버에선 영향X)

// 1) 필수 키 존재 확인
const required = [
  'EXPO_PUBLIC_SUPABASE_URL',
  'EXPO_PUBLIC_SUPABASE_ANON_KEY',
];

const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(
    `❌ Missing required env: ${missing.join(', ')}\n` +
    `Add them to your .env (local) or Expo EAS Environment variables (cloud).`
  );
  process.exit(1);
}

// 2) URL 형식 점검 (http/https 포함)
try {
  const url = new URL(process.env.EXPO_PUBLIC_SUPABASE_URL);
  if (!/^https?:/.test(url.protocol)) {
    throw new Error('URL must start with http or https.');
  }
} catch (e) {
  console.error(`❌ Invalid EXPO_PUBLIC_SUPABASE_URL: ${process.env.EXPO_PUBLIC_SUPABASE_URL}`);
  console.error(e?.message || e);
  process.exit(1);
}

// 3) 키 길이 간단 점검
if (process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY.length < 20) {
  console.error('❌ EXPO_PUBLIC_SUPABASE_ANON_KEY looks too short.');
  process.exit(1);
}

console.log('✅ Env check passed.');
