import { TypeKey, WineWithWinery } from "@/models/Wine";
import { WishlistResponse } from "@/models/Wishlist";
import { privateUserInstance, userInstance, wineInstance } from "@/utils/api";

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
export const getWishlist = async (
  wineId: number
): Promise<WishlistResponse> => {
  const { data } = await privateUserInstance.get<WishlistResponse>(
    `me/wines/wishlist?wineId=${wineId}`
  );
  return data;
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
