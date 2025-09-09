import { Wine } from "@/models/Wine";
import { privateUserInstance } from "@/utils/api";

export const patchEmail = async (
  code: string,
  email: string
): Promise<void> => {
  await privateUserInstance.patch<void>(`me/email`, {
    email,
    code,
  });
};
export const patchPassword = async (
  oldPassword: string,
  newPassword: string
): Promise<void> => {
  await privateUserInstance.patch<void>(`me/password`, {
    oldPassword,
    newPassword,
  });
};

export interface MyWishlistResponse {
  content: Wine[];
  totalElements: number;
}
export const getMyWishlist = async (): Promise<MyWishlistResponse> => {
  const { data } = await privateUserInstance.get<MyWishlistResponse>(
    `me/wines/wishlist`
  );
  return data;
};
