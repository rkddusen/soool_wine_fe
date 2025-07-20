import { Filter } from "@/models/Filter";
import { WineWithWinery } from "@/models/Wine";
import { wineInstance } from "@/utils/api";
import qs from "qs";

export interface WinesResponse {
  content: WineWithWinery[];
  totalElements: number;
  totalPages: number;
}

export const getWines = async (
  pageIndex: number,
  search: string | null,
  filter: Filter
): Promise<WinesResponse> => {
  const params: Record<string, any> = {
    page: pageIndex - 1,
    ...(search ? { search } : {}),
    ...Object.fromEntries(
      Object.entries(filter).filter(([_, v]) => v && v.length)
    ),
  };

  const { data } = await wineInstance.get<WinesResponse>("/", {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return data;
};
