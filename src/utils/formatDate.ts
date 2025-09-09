/**
 * utils/formatDate.ts
 * ISO 날짜 문자열을 "YYYY.MM.DD. hh:mm"로 변환하는 커스텀 훅
 * - YYYY.MM.DD. hh:mm 문자열 반환
 */

export const formatDate = (raw: string) => {
  const date = new Date(raw);
  if (isNaN(date.getTime())) return "-";

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  return `${y}.${m}.${d}. ${h}:${min}`;
};
