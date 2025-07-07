export type StructureKey = "sweetness" | "acidity" | "body" | "tannin";
export interface StructureInfo {
  sweetness: number | null;
  acidity: number | null;
  body: number | null;
  tannin: number | null;
}
export interface StructureLevel {
  low: string;
  high: string;
}
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

export type TypeKey = "red" | "white" | "rose" | "sparkling" | "etc";
export type PrimaryTypeKey = Exclude<TypeKey, "etc">;

export interface Type {
  label: string;
  title: string;
  type: TypeKey;
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
