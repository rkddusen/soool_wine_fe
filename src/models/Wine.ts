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
