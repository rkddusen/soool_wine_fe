// Info/infoBox/Wishlist.tsx
// 와인 위시리스트 버튼
import { useDebounceWishlist } from "@/features/wine/hooks/useDebounceWishlist";
import { HeartIcon as HeartIconEmpty } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFill } from "@heroicons/react/24/solid";

interface WishlistProps {
  wineId: number;
}

const Wishlist = ({ wineId }: WishlistProps) => {
  const { isWishlist, toggleWishlist } = useDebounceWishlist(wineId);

  return (
    <button
      className={`flex items-center justify-center w-full gap-10 px-10 rounded-15 hover:cursor-pointer ${
        isWishlist ? "bg-(--light-main) text-black" : "bg-white"
      }`}
      onClick={toggleWishlist}
    >
      {isWishlist ? (
        <HeartIconFill className="w-20 h-20 shrink-0 stroke-(--heart-fill) fill-(--heart-fill)" />
      ) : (
        <HeartIconEmpty className="w-20 h-20 shrink-0" />
      )}
      <p>위시리스트</p>
    </button>
  );
};

export default Wishlist;
