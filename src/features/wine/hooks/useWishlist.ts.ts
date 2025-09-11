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
import { Wishlist } from "@/models/Wishlist";
import { useAuthStore } from "@/stores/authStore";

export const useWishlist = (id: number) => {
  const queryClient = useQueryClient();
  const queryKey = ["wine-wishlist", id];
  const user = useAuthStore((state) => state.user);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

  // GET 와인 위시리스트
  // 로그인된 상태가 아니라면 GET 요청 X
  const query = useQuery<Wishlist>({
    queryKey,
    queryFn: () => getWishlist(id),
    enabled: !isNaN(id) && !!user && !isAuthLoading,
  });

  // POST 와인 위시리스트
  const mutation = useMutation<
    void,
    Error,
    boolean,
    { previousData?: Wishlist }
  >({
    // 서버에 위시리스트 상태 업데이트 요청
    mutationFn: (nextState) => updateWishlist(id, nextState),
    // 낙관적 업데이트 처리
    onMutate: async (nextState): Promise<{ previousData?: Wishlist }> => {
      // 1. 관련 쿼리 취소 → 서버 응답이 도착해서 캐시를 덮어쓰는 상황 방지
      await queryClient.cancelQueries({ queryKey });
      // 2. 현재 데이터 스냅샷 저장 (롤백 대비)
      const previousData = queryClient.getQueryData<Wishlist>(queryKey);

      // 3. 서버 응답을 기다리지 않고, UI에 즉시 반영
      queryClient.setQueryData<Wishlist>(queryKey, {
        isWishlist: nextState,
      });

      // 4. rollback에 쓸 이전 데이터 반환
      return { previousData };
    },
    // 에러 발생 시 롤백
    onError: (_err, _nextState, context) => {
      // 실패했다면 UI 상태를 이전 값으로 되돌림
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      // 최종적으로 서버와 동기화
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    isWishlist: query.data?.isWishlist ?? false,
    mutation,
  };
};
