/**
 * features/wine/hooks/useWishlist.ts
 * 와인 아이디로 해당 와인의 위시리스트를 가져오는 커스텀 훅
 * - 캐시 키: ["wine-wishlist"]
 * - get 요청 성공 시 boolean 반환
 * - post 함수 반환
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWishlist } from "../api";
import { updateWishlist } from "@/apis/wishlistApi";
import { WishlistResponse } from "@/models/Wishlist";
import { useAuthStore } from "@/stores/authStore";

export const useWishlist = (id: number) => {
  const queryClient = useQueryClient();
  const queryKey = ["wine-wishlist", id];
  const user = useAuthStore((state) => state.user);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

  // GET 와인 위시리스트
  // 로그인된 상태가 아니라면 GET 요청 X
  const query = useQuery<WishlistResponse>({
    queryKey,
    queryFn: () => getWishlist(id),
    enabled: !isNaN(id) && !!user && !isAuthLoading,
  });

  // POST 와인 위시리스트
  const mutation = useMutation<
    void,
    Error,
    boolean,
    { previousData?: WishlistResponse }
  >({
    mutationFn: (nextState) => updateWishlist(id, nextState),
    onMutate: async (
      nextState
    ): Promise<{ previousData?: WishlistResponse }> => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<WishlistResponse>(queryKey);

      queryClient.setQueryData<WishlistResponse>(queryKey, {
        isWishlist: nextState,
      });

      return { previousData };
    },
    onError: (_err, _nextState, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
  });

  return {
    isWishlist: query.data?.isWishlist ?? false,
    mutation,
  };
};
