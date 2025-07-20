import { TypeKey, WineWithWinery } from "@/models/Wine";
import { userInstance, wineInstance } from "@/utils/api";

interface WineResponse {
  content: WineWithWinery;
}
interface WinesResponse {
  content: WineWithWinery[];
}

export const getWine = async (id: number): Promise<WineWithWinery> => {
  const { data } = await wineInstance.get<WineResponse>(`/${id}`);
  return data.content;
};

export const getWineWishlist = async (wineId: number): Promise<boolean> => {
  const { data } = await userInstance.get<boolean>(`/wishlists/${wineId}`);
  return data;
};
export const postWineWishlist = async (
  wineId: number,
  state: boolean
): Promise<void> => {
  await userInstance.post<void>(`/wishlists/${wineId}`, { state });
};

export const getWineMemo = async (wineId: number): Promise<string[]> => {
  const { data } = await userInstance.get<string[]>(`/memos/${wineId}`);
  return data;
};

export const postWineMemo = async (
  wineId: number,
  memo: string
): Promise<void> => {
  await userInstance.post<void>(`/memos/${wineId}`, {
    memo,
  });
};

export const getWineRelationByType = async (
  wineId: number,
  type: TypeKey[]
): Promise<WineWithWinery[]> => {
  const { data } = await wineInstance.get<WinesResponse>(
    `/relation/type?value=${type}&wineId=${wineId}`
  );
  return data.content;
};

export const getWineRelationByCountry = async (
  wineId: number,
  country: string[]
): Promise<WineWithWinery[]> => {
  const { data } = await wineInstance.get<WinesResponse>(
    `/relation/country?value=${country}&wineId=${wineId}`
  );
  return data.content;
};
