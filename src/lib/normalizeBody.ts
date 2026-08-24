// 원본 에디터에서 붙여넣은 인라인 스타일 HTML 본문을
// 가독성 기준에 맞게 최소 정제합니다. (구조는 건드리지 않음)
//
// - line-height:2  →  line-height:1.7  (제목까지 과했던 줄간격 완화)
// - text-align:justify  제거          (한글 본문 가독성)
// - 표의 <th>에 scope 보강            (접근성/크롤러 인식)
//
// 규칙 기반 치환이라 AI가 필요 없습니다.

export function normalizeBody(html: string): string {
  let out = html

  // line-height:2 (뒤에 ; 또는 " 또는 ' 가 오는 경우 모두)
  out = out.replace(/line-height\s*:\s*2(\s*[;"'])/g, 'line-height:1.7$1')

  // text-align:justify → 제거 (세미콜론 포함 통째로)
  out = out.replace(/text-align\s*:\s*justify\s*;?/g, '')

  // <th ...> 에 scope 없으면 col 추가
  out = out.replace(/<th(?![^>]*\bscope=)/g, '<th scope="col"')

  return out
}
