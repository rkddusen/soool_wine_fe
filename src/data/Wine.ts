import { WineType } from "@/models/Wine";

export const WINETYPE_ARRAY: WineType[] = [
  {
    label: "Red Wine",
    title: "레드 와인",
    type: "red",
    bg: "bg-(--red-wine)",
    fill: "fill-(--red-wine)",
  },
  {
    label: "White Wine",
    title: "화이트 와인",
    type: "white",
    bg: "bg-(--white-wine)",
    fill: "fill-(--white-wine)",
  },
  {
    label: "Rose Wine",
    title: "로제 와인",
    type: "rose",
    bg: "bg-(--rose-wine)",
    fill: "fill-(--rose-wine)",
  },
  {
    label: "Sparkling Wine",
    title: "스파클링 와인",
    type: "sparkling",
    bg: "bg-(--sparkling-wine)",
    fill: "fill-(--sparkling-wine)",
  },
];

export const WINETYPE_MAP: Map<string, WineType> = new Map(
  WINETYPE_ARRAY.map((item) => [item.type, item])
);

export const WINETASTEDEGREE = [
  "bg-(--very-light-degree)",
  "bg-(--light-degree)",
  "bg-(--medium-degree)",
  "bg-(--full-degree)",
  "bg-(--very-full-degree)",
];
