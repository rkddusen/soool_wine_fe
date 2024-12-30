import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  RandomWineApiResponse,
  WineApiResponse,
  WineryApiResponse,
} from "../models/Api";

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getRandomWine = async (): Promise<
  AxiosResponse<RandomWineApiResponse>
> => {
  try {
    const response: AxiosResponse<RandomWineApiResponse> =
      await instance.get<RandomWineApiResponse>(`/random`);
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
      await instance.get<WineryApiResponse>(`/winery`);
    return response;
  } catch (error) {
    console.error("Error api getWinery: ", error);
    throw error;
  }
};

export const getWine = async (
  pageIndex: number,
  search: string | null
): Promise<AxiosResponse<WineApiResponse>> => {
  try {
    let url = `/wines?page=${pageIndex - 1}`;
    if (search !== null && search !== "") {
      url += `&search=${search}`;
    }

    const response: AxiosResponse<WineApiResponse> =
      await instance.get<WineApiResponse>(url);
    return response;
  } catch (error) {
    console.error("Error api getWine: ", error);
    throw error;
  }
};
