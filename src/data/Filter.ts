import { FilterTaste } from "@/models/Filter";
import { WineType } from "@/models/Wine";
import { WINETYPE_ARRAY, WINETYPE_MAP } from "./Wine";
import { COUNTRY } from "./Country";
import { Country } from "@/models/Country";

export const FILTER_TYPE_ARRAY = [
  ...WINETYPE_ARRAY,
  {
    label: "Etc Wine",
    title: "기타 와인",
    type: "etc",
    bg: "bg-black",
    fill: "fill-black",
  },
];
export const FILTER_TYPE_MAP: Map<string, WineType> = new Map(WINETYPE_MAP);
FILTER_TYPE_MAP.set("etc", {
  label: "Etc Wine",
  title: "기타 와인",
  type: "etc",
  bg: "bg-black",
  fill: "fill-black",
});

export const FILTER_TASTE: FilterTaste[] = [
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
export const FILTER_TASTEDEGREE = [
  "text-(--light-degree)",
  "text-(--medium-degree)",
  "text-(--full-degree)",
];

// [
//   { code: "FR", en: "France", kr: "프랑스", emoji: "🇫🇷" },
// ]
export const FILTER_COUNTRY: Country[] = Array.from(
  COUNTRY,
  ([key, value]) => ({
    country: key,
    ...value,
  })
);
