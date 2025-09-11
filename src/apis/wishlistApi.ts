import { privateUserInstance } from "@/utils/api";

export const updateWishlist = async (
  wineId: number,
  nextState: boolean
): Promise<void> => {
  if (nextState)
    await privateUserInstance.post<void>(`me/wines/${wineId}/wishlist`);
  else await privateUserInstance.delete<void>(`me/wines/${wineId}/wishlist`);
};
