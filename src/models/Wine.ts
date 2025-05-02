export interface Wine {
  id: number;
  ename: string;
  kname: string;
  type: string;
  image: string | null;
  abv: number | null;
  sweetness: number | null;
  acidity: number | null;
  body: number | null;
  tannin: number | null;
  city: string | null;
  winery: string;
}
export interface Winery {
  country: string;
  region: string;
  wineryImage: string | null;
}

export interface WineType {
  label: string;
  title: string;
  type: string;
  bg: string;
  fill: string;
}

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

export interface CountryInfo {
  ename: string;
  kname: string;
  emoji: string;
}

export const Country = new Map<string, CountryInfo>([
  ["FR", { ename: "France", kname: "프랑스", emoji: "🇫🇷" }],
  ["IT", { ename: "Italy", kname: "이탈리아", emoji: "🇮🇹" }],
  ["DE", { ename: "Germany", kname: "독일", emoji: "🇩🇪" }],
  ["ES", { ename: "Spain", kname: "스페인", emoji: "🇪🇸" }],
  ["US", { ename: "United States", kname: "미국", emoji: "🇺🇸" }],
  ["AU", { ename: "Australia", kname: "호주", emoji: "🇦🇺" }],
  ["CL", { ename: "Chile", kname: "칠레", emoji: "🇨🇱" }],
  ["GR", { ename: "Greece", kname: "그리스", emoji: "🇬🇷" }],
  ["AT", { ename: "Austria", kname: "오스트리아", emoji: "🇦🇹" }],
  ["ZA", { ename: "South Africa", kname: "남아프리카 공화국", emoji: "🇿🇦" }],
  ["AR", { ename: "Argentina", kname: "아르헨티나", emoji: "🇦🇷" }],
  ["PT", { ename: "Portugal", kname: "포르투갈", emoji: "🇵🇹" }],
  ["etc", { ename: "etc", kname: "기타 국가", emoji: "🏳️" }],
]);
