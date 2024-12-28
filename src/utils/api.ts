import axios, { AxiosInstance, AxiosResponse } from "axios";
import { RandomWineApiResponse, WineryApiResponse } from "../models/Api";

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
