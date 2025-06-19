import { WineType, WineTypeKey } from "@/models/Wine";

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
  {
    label: "Etc Wine",
    title: "기타 와인",
    type: "etc",
    bg: "bg-black",
    fill: "fill-black",
  },
];

export const WINETYPE_LOOKUP: Record<WineTypeKey, WineType> =
  WINETYPE_ARRAY.reduce((acc, item) => {
    acc[item.type] = item;
    return acc;
  }, {} as Record<WineTypeKey, WineType>);

export const WINESTRUCTURE = {
  sweetness: {
    title: "당도",
    rotation: "rotate-0",
    level: { low: "드라이", high: "스위트" },
  },
  acidity: {
    title: "산도",
    rotation: "rotate-90",
    level: { low: "낮음", high: "높음" },
  },
  body: {
    title: "바디",
    rotation: "-rotate-90",
    level: { low: "라이트", high: "풀바디" },
  },
  tannin: {
    title: "타닌",
    rotation: "rotate-180",
    level: { low: "부드러움", high: "떫음" },
  },
};
export const WINESTRUCTUREDEGREE = [
  "bg-(--very-light-degree)",
  "bg-(--light-degree)",
  "bg-(--medium-degree)",
  "bg-(--full-degree)",
  "bg-(--very-full-degree)",
];
