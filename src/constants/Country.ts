import { Country } from "@/models/Country";

export const COUNTRY_ARRAY: Country[] = [
  { code: "FR", en: "France", kr: "프랑스", emoji: "🇫🇷" },
  { code: "IT", en: "Italy", kr: "이탈리아", emoji: "🇮🇹" },
  { code: "DE", en: "Germany", kr: "독일", emoji: "🇩🇪" },
  { code: "ES", en: "Spain", kr: "스페인", emoji: "🇪🇸" },
  { code: "US", en: "United States", kr: "미국", emoji: "🇺🇸" },
  { code: "AU", en: "Australia", kr: "호주", emoji: "🇦🇺" },
  { code: "CL", en: "Chile", kr: "칠레", emoji: "🇨🇱" },
  { code: "GR", en: "Greece", kr: "그리스", emoji: "🇬🇷" },
  { code: "AT", en: "Austria", kr: "오스트리아", emoji: "🇦🇹" },
  { code: "ZA", en: "South Africa", kr: "남아프리카 공화국", emoji: "🇿🇦" },
  { code: "AR", en: "Argentina", kr: "아르헨티나", emoji: "🇦🇷" },
  { code: "PT", en: "Portugal", kr: "포르투갈", emoji: "🇵🇹" },
  { code: "etc", en: "etc", kr: "기타 국가", emoji: "🏳️" },
];
export const COUNTRY_LOOKUP: Record<string, Country> = COUNTRY_ARRAY.reduce(
  (acc, item) => {
    acc[item.code] = item;
    return acc;
  },
  {} as Record<string, Country>
);
