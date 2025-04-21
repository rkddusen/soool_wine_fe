import axios, { AxiosInstance, AxiosResponse } from "axios";
import qs from "qs";
import {
  RandomWineApiResponse,
  WinesResponse,
  WineryApiResponse,
  EmailVerificationTokenResponse,
  LoginTokenResponse,
} from "../models/Api";
import { Filter } from "../models/Filter";

const BASEURL = import.meta.env.VITE_API_BASE_URL;
const HEADERS = {
  "Content-Type": "application/json",
};

const wineInstance: AxiosInstance = axios.create({
  baseURL: BASEURL + "/wine",
  headers: HEADERS,
});
const userInstance: AxiosInstance = axios.create({
  baseURL: BASEURL + "/user",
  headers: HEADERS,
});

export const getRandomWine = async (): Promise<
  AxiosResponse<RandomWineApiResponse>
> => {
  try {
    const response: AxiosResponse<RandomWineApiResponse> =
      await wineInstance.get<RandomWineApiResponse>(`/random`);
    return response;
  } catch (error) {
    console.error("Error api getRandomWine: ", error);
    throw error;
  }
};

export const getWinery = async (): Promise<
  AxiosResponse<WineryApiResponse>
> => {
  try {
    const response: AxiosResponse<WineryApiResponse> =
      await wineInstance.get<WineryApiResponse>(`/winery`);
    return response;
  } catch (error) {
    console.error("Error api getWinery: ", error);
    throw error;
  }
};

export const getWines = async (
  pageIndex: number,
  search: string | null,
  filter: Filter
): Promise<WinesResponse> => {
  try {
    const params: Record<string, any> = {
      page: pageIndex - 1,
      ...(search ? { search } : {}),
      ...Object.fromEntries(
        Object.entries(filter).filter(([_, v]) => v && v.length)
      ),
    };

    const { data } = await wineInstance.get<WinesResponse>("/wines", {
      params,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }),
    });
    return data;
  } catch (error) {
    console.error("Error api getWines: ", error);
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
