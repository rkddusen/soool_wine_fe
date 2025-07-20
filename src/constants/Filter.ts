// constants/Filter.ts
import { FILTER_KEYS, FilterKey, Filter } from "@/models/Filter";
import {
  STRUCTURE_LEVEL_KEYS,
  StructureLevelKey,
  TYPE_KEYS,
} from "@/models/Wine";
import { STRUCTURE_ARRAY, TYPE_ARRAY } from "./Wine";
import { COUNTRY_ARRAY } from "./Country";

// 초기 필터 값
export const INIT_FILTER: Filter = FILTER_KEYS.reduce((acc, key) => {
  acc[key] = [];
  return acc;
}, {} as Filter);

// 허용되는 필터 값
export const ALLOWED_FILTER: {
  [K in FilterKey]: Set<string>;
} = {
  type: new Set(TYPE_KEYS),
  sweetness: new Set(STRUCTURE_LEVEL_KEYS),
  acidity: new Set(STRUCTURE_LEVEL_KEYS),
  body: new Set(STRUCTURE_LEVEL_KEYS),
  tannin: new Set(STRUCTURE_LEVEL_KEYS),
  country: new Set(COUNTRY_ARRAY.map((c) => c.code)),
} as const;

export const FILTER_LABELS: Record<keyof Filter, (value: any) => string> = {
  type: (value) => `${TYPE_ARRAY.find((w) => w.type === value)?.name}`,
  sweetness: (value: StructureLevelKey) =>
    `당도: ${
      STRUCTURE_ARRAY.find((t) => t.structure === "sweetness")?.level[value]
    }`,
  acidity: (value: StructureLevelKey) =>
    `산도: ${
      STRUCTURE_ARRAY.find((t) => t.structure === "acidity")?.level[value]
    }`,
  body: (value: StructureLevelKey) =>
    `바디: ${
      STRUCTURE_ARRAY.find((t) => t.structure === "body")?.level[value]
    }`,
  tannin: (value: StructureLevelKey) =>
    `타닌: ${
      STRUCTURE_ARRAY.find((t) => t.structure === "tannin")?.level[value]
    }`,
  country: (value) =>
    `${COUNTRY_ARRAY.find((c) => c.code === value)?.emoji} ${
      COUNTRY_ARRAY.find((c) => c.code === value)?.kr
    }`,
};

export const FILTER_TASTEDEGREE = [
  "text-(--light-degree)",
  "text-(--medium-degree)",
  "text-(--full-degree)",
];
