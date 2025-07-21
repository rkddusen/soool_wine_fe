import { WineryShortDescription } from "./Wine";

export interface WineryApiResponse {
  content: WineryShortDescription[];
}

export interface EmailVerificationTokenResponse {
  token: string;
}
