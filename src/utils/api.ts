import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  RandomWineApiResponse,
  WineApiResponse,
  WineryApiResponse,
} from "../models/Api";
import { Filter } from "../models/Filter";
import { Country } from "../models/Wine";

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
  search: string | null,
  filter: Filter
): Promise<AxiosResponse<WineApiResponse>> => {
  try {
    const TYPE = ["red", "white", "rose", "sparkling", "etc"];
    const COUNTRY = Array.from(Country, ([key, value]) => ({
      country: key,
      ...value,
    }));
    let typeStr = "";
    let countryStr = "";
    if (filter.type?.length) {
      const typeIndexArr: number[] = filter.type;
      const typeArr: string[] = typeIndexArr.map((v) => TYPE[v]);

      typeStr = typeArr.join(",");
    }
    if (filter.country?.length) {
      const countryIndexArr: number[] = filter.country;
      const countryArr: string[] = countryIndexArr.map(
        (v) => COUNTRY[v].country
      );
      countryStr = countryArr.join(",");
    }
    let url = `/wines?page=${pageIndex - 1}`;
    if (search !== null && search !== "") {
      url += `&search=${search}`;
    }
    if (filter.type?.length) {
      url += `&type=${typeStr}`;
    }
    if (filter.sweetness?.length) {
      url += `&sweetness=${filter.sweetness}`;
    }
    if (filter.acidity?.length) {
      url += `&acidity=${filter.acidity}`;
    }
    if (filter.body?.length) {
      url += `&body=${filter.body}`;
    }
    if (filter.tannin?.length) {
      url += `&tannin=${filter.tannin}`;
    }
    if (filter.country?.length) {
      url += `&country=${countryStr}`;
    }

    const response: AxiosResponse<WineApiResponse> =
      await instance.get<WineApiResponse>(url);
    return response;
  } catch (error) {
    console.error("Error api getWine: ", error);
    throw error;
  }
};
