// 숫자를 천 단위 구분자(,)가 있는 형식으로 변환
function formatThousandSeparator(value: number | string): string {
  return Number(value).toLocaleString('ko-KR')
}

// 등락률을 소수점 둘째자리까지 표시 (예: 0.38)
function formatFluctuationRate(value: number | string): string {
  const num = Number(value)
  return num.toFixed(2)
}

// 금액을 한국어 단위로 변환 (조, 억, 만)
function formatKoreanCurrency(value: number | string): string {
  const num = Number(value)

  // 1조 이상
  if (num >= 1e12) {
    const trillions = Math.floor(num / 1e12)
    return `${trillions}조`
  }

  // 1억 이상
  if (num >= 1e8) {
    const billions = Math.floor(num / 1e8)
    return `${billions}억`
  }

  // 1만 이상
  if (num >= 1e4) {
    const tenThousands = Math.floor(num / 1e4)
    return `${tenThousands}만`
  }

  // 1만 미만
  return num.toLocaleString()
}

export { formatFluctuationRate, formatKoreanCurrency, formatThousandSeparator }

