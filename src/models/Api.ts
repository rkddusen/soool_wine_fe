import { WineryShortDescription, WineWithWinery } from "./Wine";

export interface RandomWineApiResponse {
  content: WineWithWinery[];
}

export interface WineryApiResponse {
  content: WineryShortDescription[];
}

export interface WineApiResponse {
  content: WineWithWinery[];
  totalElements: number;
  totalPages: number;
  [key: string]: any;
}
