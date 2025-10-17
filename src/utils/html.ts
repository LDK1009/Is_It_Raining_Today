// HTML 태그와 HTML 엔티티를 제거하는 함수
function removeHtmlAndEntities(text: string) {
  return text
    .replace(/<[^>]*>/g, '') // HTML 태그 제거
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ') // 연속된 공백 제거
    .trim()
}

function cleanHtmlContent(text: string) {
  return text
    .replace(/<script[^>]*>.*?<\/script>/gs, '')
    .replace(/<style[^>]*>.*?<\/style>/gs, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')      // 큰따옴표 엔티티
    .replace(/&apos;/g, "'")      // 작은따옴표 엔티티
    .replace(/&[^;]+;/g, '')      // 나머지 HTML 엔티티
    .replace(/\[.*?\]/g, '')
    .replace(/[^\w\s가-힣.'"]/g, ' ') // 온점(.), 따옴표('") 포함
    .replace(/\s+/g, ' ')
    .trim()
}

export { cleanHtmlContent, removeHtmlAndEntities }

