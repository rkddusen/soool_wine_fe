// My/api.ts
import { MyMemo } from "@/models/Memo";
import { Wine } from "@/models/Wine";
import { privateUserInstance } from "@/apis/instance";

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
  hasNext: boolean;
  nextCursorId: number | null;
  nextCursorDate: number | null;
}
export const getMyWishlist = async (
  cursorId: number | null,
  cursorDate: number | null
): Promise<MyWishlistResponse> => {
  const { data } = await privateUserInstance.get<MyWishlistResponse>(
    cursorId
      ? `me/wines/wishlist?cursorId=${cursorId}&cursorDate=${cursorDate}`
      : `/me/wines/wishlist`
  );
  return data;
};

export interface MyMemosResponse {
  content: MyMemo[];
  hasNext: boolean;
  nextCursorId: number | null;
  nextCursorDate: number | null;
}
export const getMyMemos = async (
  cursorId: number | null,
  cursorDate: number | null
): Promise<MyMemosResponse> => {
  const { data } = await privateUserInstance.get<MyMemosResponse>(
    cursorId
      ? `me/wines/memos?cursorId=${cursorId}&cursorDate=${cursorDate}`
      : `/me/wines/memos`
  );
  return data;
};
