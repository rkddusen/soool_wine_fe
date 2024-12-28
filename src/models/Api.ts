import { WineryShortDescription, WineWithWinery } from "./Wine";

export interface RandomWineApiResponse {
  content: WineWithWinery[];
}

export interface WineryApiResponse {
  content: WineryShortDescription[];
}
