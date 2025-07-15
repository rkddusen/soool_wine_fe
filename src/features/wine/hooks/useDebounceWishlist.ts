/**
 * features/main/hooks/useDebounceWishlist.ts
 * 와인 아이디를 통해 위시리스트를 토글하는 커스텀 훅
 * 클라이언트에 먼저 반영한 후, 서버에 요청을 보내는 구조
 * - wishlist와 toggleWishlist 반환
 */
import { useEffect, useRef, useState } from "react";
import { useWineWishlist } from "./useWineWishlist.ts";
import { debounce } from "lodash";
import toast from "react-hot-toast";

export const useDebounceWishlist = (wineId: number) => {
  // GET 위시리스트
  const { data: wishlistData, WineWishlistMutation } = useWineWishlist(wineId);
  const [wishlist, setWishlist] = useState<boolean>(wishlistData ?? false);
  const [rollback, setRollback] = useState<boolean>(wishlist);

  // GET 요청에 성공하면 업데이트
  useEffect(() => {
    if (wishlistData !== undefined) {
      setWishlist(wishlistData);
      setRollback(wishlistData);
    }
  }, [wishlistData]);

  // 언마운트 시 debounce 해제
  useEffect(() => {
    return () => {
      debounceMutateRef.current.cancel();
    };
  }, []);

  // debounce 설정. 500ms동안 변화 없으면 POST 요청
  const debounceMutateRef = useRef(
    debounce((nextState: boolean) => {
      WineWishlistMutation(nextState, {
        // 성공하면 rollback 데이터 업데이트
        onSuccess: () => {
          setRollback(nextState);
        },
        // 실패하면 rollback 데이터로 롤백
        onError: (error) => {
          toast.error("서버와 문제가 생겼어요. 잠시 후 다시 시도해주세요.");
          console.log("Error postWineWishlist:", error);
          setWishlist(rollback);
        },
      });
    }, 500)
  );

  // 위시리스트 UI 선 반영 후 서버 저장
  const toggleWishlist = () => {
    const nextState = !wishlist;
    setWishlist(nextState);
    debounceMutateRef.current(nextState);
  };

  return { wishlist, toggleWishlist };
};
