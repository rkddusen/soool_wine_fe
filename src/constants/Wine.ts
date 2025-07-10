import { Structure, StructureKey, Type, TypeKey } from "@/models/Wine";

export const TYPE_ARRAY: Type[] = [
  {
    label: "Red Wine",
    title: "레드 와인",
    type: "red",
  },
  {
    label: "White Wine",
    title: "화이트 와인",
    type: "white",
  },
  {
    label: "Rose Wine",
    title: "로제 와인",
    type: "rose",
  },
  {
    label: "Sparkling Wine",
    title: "스파클링 와인",
    type: "sparkling",
  },
  {
    label: "Etc Wine",
    title: "기타 와인",
    type: "etc",
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
