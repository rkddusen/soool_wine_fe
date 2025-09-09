/**
 * features/auth/my/hooks/useMyWishlist.ts
 * 나의 위시리스트를 불러오는 커스텀 훅
 * - 캐시 키: ["my-wishlist"]
 * - 성공 시 WishlistResponse 반환
 */
import { useQuery } from "@tanstack/react-query";
import { getMyWishlist, MyWishlistResponse } from "../api";

export const useMyWishlist = () => {
  return useQuery<MyWishlistResponse>({
    queryKey: ["my-wishlist"],
    queryFn: getMyWishlist,
  });
};
