// Info/infoBox/Wishlist.tsx
// 와인 위시리스트 버튼
import { useMutation } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { postWineWishlist } from "@/utils/api";
import { HeartIcon as HeartIconEmpty } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFill } from "@heroicons/react/24/solid";

interface Props {
  wineId: number;
  wishlist: boolean;
  refetchWineWishlist: () => void;
  isWishlistError: boolean;
}

const Wishlist = ({
  wineId,
  wishlist: initialWishlist,
  refetchWineWishlist,
  isWishlistError,
}: Props) => {
  const [wishlist, setWishlist] = useState<boolean>(initialWishlist);
  const callPostWineWishlist = async (): Promise<void> => {
    await postWineWishlist(wineId);
  };

  // 위시리스트 post
  const mutation = useMutation<void, Error, boolean>({
    mutationFn: callPostWineWishlist,
    onError: async (error: Error) => {
      // 위시리스트 post 오류 시 위시리스트 refetch
      console.log("Error postWishlist: ", error);
      toast.error("서버와 문제가 생겼어요. 잠시 후 다시 시도해주세요.");

      refetchWineWishlist();
    },
  });
  useEffect(() => {
    if (mutation.isError && isWishlistError) {
      setWishlist(initialWishlist); // 이전 값으로 복구
    }
  }, [mutation.isError, isWishlistError]);

  const debounceMutateRef = useRef(
    debounce((nextState: boolean) => {
      mutation.mutate(nextState);
    }, 500)
  );

  const handleClickWishlist = () => {
    const nextState = !wishlist;
    setWishlist(nextState);
    debounceMutateRef.current(nextState);
  };

  return (
    <button
      className={`flex items-center justify-center w-full gap-10 px-10 rounded-15 hover:cursor-pointer ${
        wishlist ? "bg-(--light-main) text-black" : "bg-white"
      }`}
      onClick={handleClickWishlist}
    >
      {wishlist ? (
        <HeartIconFill className="w-20 h-20 shrink-0 stroke-(--heart-fill) fill-(--heart-fill)" />
      ) : (
        <HeartIconEmpty className="w-20 h-20 shrink-0" />
      )}
      <p>위시리스트</p>
    </button>
  );
};

export default Wishlist;
