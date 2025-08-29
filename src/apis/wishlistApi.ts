import { privateUserInstance } from "@/utils/api";

export const updateWishlist = async (
  wineId: number,
  nextState: boolean
): Promise<void> => {
  if (nextState)
    await privateUserInstance.post<void>(`me/wines/wishlist?wineId=${wineId}`);
  else
    await privateUserInstance.delete<void>(
      `me/wines/wishlist?wineId=${wineId}`
    );
};
