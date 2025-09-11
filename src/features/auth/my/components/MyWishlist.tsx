import { Link } from "react-router-dom";
import { useMyWishlist } from "../hooks/useMyWishlist";
import { useUpdateWishlist } from "../hooks/useUpdateWishlist";
import { TYPE_LOOKUP } from "@/constants/Wine";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

// MyWishlist.tsx
const MyWishlist = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.removeQueries({ queryKey: ["my-wishlist"] });
  }, []);
  const { data } = useMyWishlist();
  const { removedId, toggleWishlist } = useUpdateWishlist();

  return (
    <div className="mt-50 px-20 mx-auto md:px-40 max-w-1280">
      <p className="text-16 md:text-20 flex items-center gap-10">
        <span className="text-24 md:text-32 font-medium">위시리스트</span>
        {/* {data?.totalElements}개 */}
      </p>
      <ul className="mt-20">
        {data?.content.map((v) => (
          <Link to={`/wine/${v.id}`} key={v.id}>
            <li>
              <div className="w-full p-20 h-150 md:h-200 border-b border-(--gray-bb) flex justify-between items-center hover:cursor-pointer">
                {/* 와인 정보 */}
                <div className="h-full flex">
                  <img
                    src={v.image ? v.image : undefined}
                    className="object-cover h-full"
                  />
                  <div>
                    <span
                      className={`text-12 type-box`}
                      style={{
                        backgroundColor: `var(--${
                          TYPE_LOOKUP[v.type].type ?? TYPE_LOOKUP["etc"].type
                        }-wine)`,
                      }}
                    >
                      {TYPE_LOOKUP[v.type].name ?? TYPE_LOOKUP["etc"].name}
                    </span>
                    <p className="line-clamp-2 md:text-20 text-16 leading-[120%] font-light mt-5">
                      {v.ename}
                    </p>
                    <p className="line-clamp-2 md:text-16 text-14 leading-[120%] mt-5">
                      {v.kname}
                    </p>
                  </div>
                </div>
                {/* 위시리스트 버튼 */}
                <button
                  onClick={(e) => toggleWishlist(e, v.id)}
                  className="sm:w-50 sm:h-50 w-40 h-40 p-10 m-10 bg-white border border-(--gray-e0) rounded-full shrink-0 hover:cursor-pointer"
                >
                  {removedId.has(v.id) ? (
                    <HeartIcon className="fill-(--gray-e0)" />
                  ) : (
                    <HeartIcon className="fill-(--heart-fill)" />
                  )}
                </button>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default MyWishlist;
