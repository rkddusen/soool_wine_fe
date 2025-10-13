/**
 * Detail/hooks/useDebounceWishlist.ts
 * 와인 아이디를 통해 위시리스트를 토글하는 커스텀 훅
 * 클라이언트에 먼저 반영한 후, 서버에 요청을 보내는 구조
 * - wishlist와 toggleWishlist 반환
 */
import { useEffect, useRef } from "react";
import { useWishlist } from "./useWishlist.ts";
import { debounce } from "lodash";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore.ts";
import { useLocation, useNavigate } from "react-router-dom";

export const useDebounceWishlist = (id: number) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

  const queryClient = useQueryClient();
  const { isWishlist, mutation } = useWishlist(id);

  // 디바운싱
  const debounceMutateRef = useRef(
    debounce((nextState: boolean) => {
      mutation.mutate(nextState, {
        onSuccess: () => {
          toast.success(
            nextState
              ? "위시리스트에 추가되었어요."
              : "위시리스트에서 삭제되었어요."
          );
        },
        onError: () => {
          toast.error("서버와 문제가 생겼어요. 잠시 후 다시 시도해주세요.");
        },
      });
    }, 200)
  );

  useEffect(() => {
    return () => {
      debounceMutateRef.current.cancel();
    };
  }, []);

  // 로그인 페이지로 리다이렉트
  const handleLoginRedirect = () => {
    const currentPath = location.pathname + location.search;
    navigate(`/login?url=${encodeURIComponent(currentPath)}`);
  };
  // 위시리스트 토글 함수
  const toggleWishlist = () => {
    // 로그인되어 있지 않으면 로그인 페이지로 리다이렉트
    if (!user || isAuthLoading) {
      handleLoginRedirect();
      return;
    }

    const nextState = !isWishlist;
    queryClient.setQueryData(["wine-wishlist", id], { isWishlist: nextState });
    debounceMutateRef.current(nextState);
  };

  return {
    isWishlist,
    toggleWishlist,
  };
};
