// MyWishlist/MyWishlistItem.tsx
// 내 위시리스트의 각 요소를 보여주는 컴포넌트
import { Link } from "react-router-dom";
import { TYPE_LOOKUP } from "@/constants/Wine";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Wine } from "@/models/Wine";

interface MyWishlistItemProps {
  wine: Wine;
  removedId: Set<number>;
  toggleWishlist: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
}

const MyWishlistItem = ({
  wine,
  removedId,
  toggleWishlist,
}: MyWishlistItemProps) => {
  return (
    <Link to={`/wine/${wine.id}`}>
      <li>
        <div className="w-full p-20 h-150 md:h-200 border-b border-(--gray-bb) flex justify-between items-center hover:cursor-pointer">
          {/* 와인 정보 */}
          <div className="h-full flex">
            <img
              src={wine.image ? wine.image : undefined}
              className="object-cover h-full"
            />
            <div>
              <span
                className={`text-12 type-box`}
                style={{
                  backgroundColor: `var(--${
                    TYPE_LOOKUP[wine.type].type ?? TYPE_LOOKUP["etc"].type
                  }-wine)`,
                }}
              >
                {TYPE_LOOKUP[wine.type].name ?? TYPE_LOOKUP["etc"].name}
              </span>
              <p className="line-clamp-2 md:text-20 text-16 leading-[120%] font-light mt-5">
                {wine.ename}
              </p>
              <p className="line-clamp-2 md:text-16 text-14 leading-[120%] mt-5">
                {wine.kname}
              </p>
            </div>
          </div>
          {/* 위시리스트 버튼 */}
          <button
            onClick={(e) => toggleWishlist(e, wine.id)}
            className="sm:w-50 sm:h-50 w-40 h-40 p-10 m-10 bg-white border border-(--gray-e0) rounded-full shrink-0 hover:cursor-pointer"
          >
            {removedId.has(wine.id) ? (
              <HeartIcon className="fill-(--gray-e0)" />
            ) : (
              <HeartIcon className="fill-(--heart-fill)" />
            )}
          </button>
        </div>
      </li>
    </Link>
  );
};

export default MyWishlistItem;
