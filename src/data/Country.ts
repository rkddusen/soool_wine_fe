import { Country } from "@/models/Country";

export const COUNTRY = new Map<string, Country>([
  ["FR", { code: "FR", en: "France", kr: "프랑스", emoji: "🇫🇷" }],
  ["IT", { code: "IT", en: "Italy", kr: "이탈리아", emoji: "🇮🇹" }],
  ["DE", { code: "DE", en: "Germany", kr: "독일", emoji: "🇩🇪" }],
  ["ES", { code: "ES", en: "Spain", kr: "스페인", emoji: "🇪🇸" }],
  ["US", { code: "US", en: "United States", kr: "미국", emoji: "🇺🇸" }],
  ["AU", { code: "AU", en: "Australia", kr: "호주", emoji: "🇦🇺" }],
  ["CL", { code: "CL", en: "Chile", kr: "칠레", emoji: "🇨🇱" }],
  ["GR", { code: "GR", en: "Greece", kr: "그리스", emoji: "🇬🇷" }],
  ["AT", { code: "AT", en: "Austria", kr: "오스트리아", emoji: "🇦🇹" }],
  [
    "ZA",
    { code: "ZA", en: "South Africa", kr: "남아프리카 공화국", emoji: "🇿🇦" },
  ],
  ["AR", { code: "AR", en: "Argentina", kr: "아르헨티나", emoji: "🇦🇷" }],
  ["PT", { code: "PT", en: "Portugal", kr: "포르투갈", emoji: "🇵🇹" }],
  ["etc", { code: "etc", en: "etc", kr: "기타 국가", emoji: "🏳️" }],
]);
