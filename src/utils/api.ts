import axios, { AxiosInstance } from "axios";
import {
  WineResponse,
  EmailVerificationTokenResponse,
  LoginTokenResponse,
} from "../models/Api";

const BASEURL = import.meta.env.VITE_API_BASE_URL;
const HEADERS = {
  "Content-Type": "application/json",
};

export const wineInstance: AxiosInstance = axios.create({
  baseURL: BASEURL + "/wine",
  headers: HEADERS,
});
export const userInstance: AxiosInstance = axios.create({
  baseURL: BASEURL + "/user",
  headers: HEADERS,
});

export const getWine = async (id: number): Promise<WineResponse> => {
  try {
    const { data } = await wineInstance.get<WineResponse>(`/wines/${id}`);
    return data;
  } catch (error) {
    console.error("Error api getWine: ", error);
    throw error;
  }
};

export const getIdExists = async (id: string): Promise<boolean> => {
  try {
    const response = await userInstance.get<boolean>(
      `/users/id-exists?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error api getIdExists: ", error);
    throw error;
  }
};

export const postEmail = async (
  email: string
): Promise<EmailVerificationTokenResponse> => {
  try {
    const { data } = await userInstance.post<EmailVerificationTokenResponse>(
      `/users/email-verification`,
      { email }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const postCode = async (
  token: string | undefined,
  email: string | undefined,
  code: number
): Promise<void> => {
  try {
    await userInstance.post<void>(`/users/email-verification/verify`, {
      token,
      email,
      code,
    });
  } catch (error) {
    console.error("Error api postCode: ", error);
    throw error;
  }
};

export const postUsers = async (
  id: string,
  password: string,
  email: string
): Promise<void> => {
  try {
    await userInstance.post<void>(`/users`, {
      id,
      password,
      email,
    });
  } catch (error) {
    console.error("Error api postUsers: ", error);
    throw error;
  }
};

export const postLogin = async (
  id: string,
  password: string
): Promise<LoginTokenResponse> => {
  try {
    const { data } = await userInstance.post<LoginTokenResponse>(
      `/auth/login`,
      {
        id,
        password,
      }
    );
    return data;
  } catch (error) {
    console.error("Error api postLogin: ", error);
    throw error;
  }
};

export const getWineWishlist = async (wineId: number): Promise<boolean> => {
  try {
    const { data } = await userInstance.get<boolean>(`/wishlists/${wineId}`);
    return data;
  } catch (error) {
    console.error("Error api getWishlist: ", error);
    throw error;
  }
};

export const postWineWishlist = async (wineId: number): Promise<void> => {
  try {
    await userInstance.post<void>(`/wishlists/${wineId}`);
  } catch (error) {
    console.error("Error api postWishlist: ", error);
    throw error;
  }
};

export const getWineMemo = async (wineId: number): Promise<string[]> => {
  try {
    const { data } = await userInstance.get<string[]>(`/memos/${wineId}`);
    return data;
  } catch (error) {
    console.error("Error api getWineMemo: ", error);
    throw error;
  }
};

export const postWineMemo = async (
  wineId: number,
  memo: string
): Promise<void> => {
  try {
    await userInstance.post<void>(`/memos/${wineId}`, {
      memo,
    });
  } catch (error) {
    console.error("Error api postWineMemo: ", error);
    throw error;
  }
};
