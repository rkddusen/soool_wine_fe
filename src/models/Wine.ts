export const STRUCTURE_KEYS = [
  "sweetness",
  "acidity",
  "body",
  "tannin",
] as const;
export type StructureKey = (typeof STRUCTURE_KEYS)[number];
export type StructureInfo = Record<StructureKey, number | null>;

export const STRUCTURE_LEVEL_KEYS = ["low", "medium", "high"] as const;
export type StructureLevelKey = (typeof STRUCTURE_LEVEL_KEYS)[number];
export type StructureLevel = Record<StructureLevelKey, string>;

export interface Structure {
  title: string;
  structure: StructureKey;
  level: StructureLevel;
}

export interface Wine {
  id: number;
  ename: string;
  kname: string;
  type: TypeKey;
  image: string | null;
  abv: number | null;
  structure: StructureInfo;
  city: string | null;
  winery: string;
}
export interface Winery {
  country: string;
  region: string;
  wineryImage: string | null;
}

export const TYPE_KEYS = ["red", "white", "rose", "sparkling", "etc"] as const;
export type TypeKey = (typeof TYPE_KEYS)[number];
export type PrimaryTypeKey = Exclude<TypeKey, "etc">;

export interface Type {
  type: TypeKey;
  label: string;
  name: string;
  shortName: string;
}

export type TodayWineType = Record<PrimaryTypeKey, WineWithWinery>;

export interface WineryShortDescription extends Winery {
  shortDescription: string;
}
export interface WineryDescription extends Winery {
  description: string;
}

export interface WineWithWinery extends Wine, Winery {}
export interface WineWithWineryShortDescription
  extends Wine,
    WineryShortDescription {}
export interface WineWithWineryDescription extends Wine, WineryDescription {}
