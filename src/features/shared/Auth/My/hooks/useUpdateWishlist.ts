/**
 * My/hooks/useUpdateWishlist.ts
 * 위시리스트 목록에서 항목을 추가/삭제하는 커스텀 훅
 * - 위시리스트에서 제거될 항목 set과 toggleWishlist 함수 반환
 */
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { debounce } from "lodash";
import { updateWishlist } from "@/apis/wishlistApi";
import toast from "react-hot-toast";

interface WishlistRequestData {
  id: number;
  nextState: boolean;
}
export const useUpdateWishlist = () => {
  const [removedId, setRemovedId] = useState<Set<number>>(new Set());
  // 롤백. 위시리스트에서 제거된 항목만 저장
  const [rollback, setRollback] = useState<Set<number>>(new Set());

  // POST 와인 위시리스트
  const mutation = useMutation<void, Error, WishlistRequestData>({
    mutationFn: ({ id, nextState }) => updateWishlist(id, nextState),
    onSuccess: (_, { id, nextState }) => {
      toast.success(
        nextState
          ? "위시리스트에 추가되었어요."
          : "위시리스트에서 삭제되었어요."
      );
      // 롤백을 위해 rollback을 최신 정보로 동기화(이미 removedId는 적용된 상태)
      const newSet = new Set(rollback);
      if (!nextState) newSet.add(id);
      else newSet.delete(id);
      setRollback(newSet);
    },
    onError: (error: Error, { id }) => {
      toast.error("서버와 문제가 생겼어요. 잠시 후 다시 시도해주세요.");
      console.log("Error update wishlist:", error);
      // 롤백. removedId 되돌리기
      const newSet = new Set(removedId);
      if (rollback.has(id)) newSet.add(id);
      else newSet.delete(id);
      setRemovedId(newSet);
    },
  });

  const debouncedRef = useRef(
    debounce((id: number, nextState: boolean) => {
      mutation.mutate({ id, nextState });
    }, 200)
  );
  useEffect(() => {
    // 안전하게 마운트시 한 번 생성, 언마운트 시 cancel
    return () => {
      debouncedRef.current?.cancel();
    };
  }, []);

  const toggleWishlist = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const newSet = new Set(removedId);
    if (removedId.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setRemovedId(newSet);
    // 서버에 전송
    debouncedRef.current(id, !newSet.has(id));
  };

  return {
    removedId,
    toggleWishlist,
  };
};
