// features/Storage/api.ts
import { Filter } from "@/models/Filter";
import { WineWithWinery } from "@/models/Wine";
import { wineInstance } from "@/apis/instance";
import qs from "qs";

export interface WinesResponse {
  content: WineWithWinery[];
  hasNext: boolean;
  nextCursorId: string | null;
}

export const getWines = async (
  cursorId: string | null,
  search: string | null,
  filter: Filter
): Promise<WinesResponse> => {
  const params: Record<string, any> = {
    ...(cursorId !== null ? { cursorId } : {}),
    ...(search ? { search } : {}),
    ...Object.fromEntries(
      Object.entries(filter).filter(([_, v]) => v && v.length)
    ),
  };
  const { data } = await wineInstance.get<WinesResponse>("", {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return data;
};
