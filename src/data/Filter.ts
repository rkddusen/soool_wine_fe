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
}

export const TASTE: TasteItem[] = [
  { taste: "sweetness", kr: "당도" },
  { taste: "acidity", kr: "산도" },
  { taste: "body", kr: "바디" },
  { taste: "tannin", kr: "타닌" },
];
export const TASTEDEGREE = [
  "text-(--very-light-degree)",
  "text-(--light-degree)",
  "text-(--medium-degree)",
  "text-(--full-degree)",
  "text-(--very-full-degree)",
];
export const COUNTRY = Array.from(Country, ([key, value]) => ({
  country: key,
  ...value,
}));
