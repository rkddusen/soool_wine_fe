/**
 * features/wine/hooks/useWineWishlist.ts
 * 와인 아이디로 해당 와인의 위시리스트를 가져오는 커스텀 훅
 * - 캐시 키: ["wine-wishlist"]
 * - get 요청 성공 시 boolean 반환
 * - post 함수 반환
 */
import { useQuery, useMutation } from "@tanstack/react-query";
import { getWineWishlist, postWineWishlist } from "../api";

export const useWineWishlist = (id: number) => {
  // GET 와인 위시리스트
  const { data } = useQuery<boolean>({
    queryKey: ["wine-wishlist", id],
    queryFn: () => getWineWishlist(id),
    enabled: !isNaN(id),
  });

  // POST 와인 위시리스트
  const mutation = useMutation<void, Error, boolean>({
    mutationFn: (nextState) => postWineWishlist(id, nextState),
  });

  return {
    data,
    WineWishlistMutation: mutation.mutate,
  };
};
