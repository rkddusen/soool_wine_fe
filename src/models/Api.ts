import { RandomWineType, WineryShortDescription, WineWithWinery } from "./Wine";

export interface RandomWineResponse {
  content: RandomWineType;
}

export interface WineryApiResponse {
  content: WineryShortDescription[];
}

export interface WinesResponse {
  content: WineWithWinery[];
  totalElements: number;
  totalPages: number;
}
export interface WineResponse {
  content: WineWithWinery;
}

export interface EmailVerificationTokenResponse {
  token: string;
}

export interface LoginTokenResponse {
  token: string;
}
