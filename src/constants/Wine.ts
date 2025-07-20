import { Structure, StructureKey, Type, TypeKey } from "@/models/Wine";

export const TYPE_ARRAY: Type[] = [
  {
    type: "red",
    label: "Red Wine",
    name: "레드 와인",
    shortName: "레드",
  },
  {
    type: "white",
    label: "White Wine",
    name: "화이트 와인",
    shortName: "화이트",
  },
  {
    type: "rose",
    label: "Rose Wine",
    name: "로제 와인",
    shortName: "로제",
  },
  {
    type: "sparkling",
    label: "Sparkling Wine",
    name: "스파클링 와인",
    shortName: "스파클링",
  },
  {
    type: "etc",
    label: "Etc Wine",
    name: "기타 와인",
    shortName: "기타",
  },
];

export const TYPE_LOOKUP: Record<TypeKey, Type> = TYPE_ARRAY.reduce(
  (acc, item) => {
    acc[item.type] = item;
    return acc;
  },
  {} as Record<TypeKey, Type>
);

export const STRUCTURE_ARRAY: Structure[] = [
  {
    title: "당도",
    structure: "sweetness",
    level: { low: "드라이", medium: "중간", high: "스위트" },
  },
  {
    title: "산도",
    structure: "acidity",
    level: { low: "낮음", medium: "중간", high: "높음" },
  },
  {
    title: "바디",
    structure: "body",
    level: { low: "라이트", medium: "중간", high: "풀바디" },
  },
  {
    title: "타닌",
    structure: "tannin",
    level: { low: "부드러움", medium: "중간", high: "떫음" },
  },
];

export const STRUCTURE_LOOKUP: Record<StructureKey, Structure> =
  STRUCTURE_ARRAY.reduce((acc, item) => {
    acc[item.structure] = item;
    return acc;
  }, {} as Record<StructureKey, Structure>);

export const STRUCTURE_DEGREE_ARRAY = [
  "very-light-degree",
  "light-degree",
  "medium-degree",
  "full-degree",
  "very-full-degree",
];
