// models/Filter.ts
import { STRUCTURE_KEYS } from "./Wine";

export const FILTER_KEYS = ["type", ...STRUCTURE_KEYS, "country"] as const;
export type FilterKey = (typeof FILTER_KEYS)[number];
export type Filter = {
  [key in FilterKey]: string[];
};
