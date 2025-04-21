import { Filter } from "@/models/Filter";
import { Country } from "@/models/Wine";

export const WINETYPE = [
  { type: "red", kr: "레드", fill: "fill-(--red-wine)" },
  { type: "white", kr: "화이트", fill: "fill-(--white-wine)" },
  { type: "rose", kr: "로제", fill: "fill-(--rose-wine)" },
  { type: "sparkling", kr: "스파클링", fill: "fill-(--sparkling-wine)" },
  { type: "etc", kr: "기타", fill: "fill-(--etc-wine)" },
];

export interface TasteItem {
  taste: keyof Filter;
  kr: string;
  level: {
    low: string;
    medium: string;
    high: string;
  };
}

export const TASTE: TasteItem[] = [
  {
    taste: "sweetness",
    kr: "당도",
    level: { low: "드라이", medium: "중간", high: "스위트" },
  },
  {
    taste: "acidity",
    kr: "산도",
    level: { low: "낮음", medium: "중간", high: "높음" },
  },
  {
    taste: "body",
    kr: "바디",
    level: { low: "라이트", medium: "중간", high: "풀바디" },
  },
  {
    taste: "tannin",
    kr: "타닌",
    level: { low: "부드러움", medium: "중간", high: "떫음" },
  },
];
export const TASTEDEGREE = [
  "text-(--very-light-degree)",
  "text-(--light-degree)",
  "text-(--medium-degree)",
  "text-(--full-degree)",
  "text-(--very-full-degree)",
];

// [
//   { country: "FR", ename: "France", kname: "프랑스", emoji: "🇫🇷" },
// ]
export const COUNTRY = Array.from(Country, ([key, value]) => ({
  country: key,
  ...value,
}));
