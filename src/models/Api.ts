import { WineryShortDescription, WineWithWinery } from "./Wine";

export interface RandomWineResponse {
  content: WineWithWinery[];
}

export interface WineryApiResponse {
  content: WineryShortDescription[];
}

export interface WinesResponse {
  content: WineWithWinery[];
  totalElements: number;
  totalPages: number;
}

export interface EmailVerificationTokenResponse {
  token: string;
}

export interface LoginTokenResponse {
  token: string;
}
