import { Memo } from "@/models/Memo";
import { TypeKey, WineWithWinery } from "@/models/Wine";
import { Wishlist } from "@/models/Wishlist";
import { privateUserInstance, wineInstance } from "@/utils/api";

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
export const getWishlist = async (wineId: number): Promise<Wishlist> => {
  const { data } = await privateUserInstance.get<Wishlist>(
    `me/wines/${wineId}/wishlist`
  );
  return data;
};

export const getMemo = async (wineId: number): Promise<Memo[]> => {
  const { data } = await privateUserInstance.get<Memo[]>(
    `/me/wines/${wineId}/memos`
  );
  return data;
};

export const postMemo = async (
  wineId: number,
  memo: string,
  clientId: string
): Promise<Memo> => {
  const { data } = await privateUserInstance.post<Memo>(
    `/me/wines/${wineId}/memos`,
    {
      memo,
      clientId,
    }
  );

  return data;
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
