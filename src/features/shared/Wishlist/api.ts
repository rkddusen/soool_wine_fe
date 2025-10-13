// features/shared/Wishlist/api.ts
// 위시리스트 관련 공통 API 호출을 담당
import { privateUserInstance } from "@/apis/instance";

export const updateWishlist = async (
  wineId: number,
  nextState: boolean
): Promise<void> => {
  if (nextState)
    await privateUserInstance.post<void>(`me/wines/${wineId}/wishlist`);
  else await privateUserInstance.delete<void>(`me/wines/${wineId}/wishlist`);
};
