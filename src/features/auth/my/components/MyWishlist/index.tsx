// MyWishlist/index.tsx
// 내 위시리스트를 보여주는 컴포넌트
import MyWishlistItem from "./MyWishlistItem";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useUpdateWishlist } from "../../hooks/useUpdateWishlist";
import { getMyWishlist } from "../../api";
import MyWishlistItemSkeleton from "./MyWishlistItemSkeleton";

// MyWishlist.tsx
const MyWishlist = () => {
  const queryKey = ["my-wishlist"];
  const {
    items: wishlist,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteScroll(queryKey, ({ cursorId, cursorDate }) =>
    getMyWishlist(cursorId, cursorDate ?? null)
  );
  const { removedId, toggleWishlist } = useUpdateWishlist();

  return (
    <div className="mt-50 px-20 mx-auto md:px-40 max-w-1280">
      <p className="text-16 md:text-20 flex items-center gap-10">
        <span className="text-24 md:text-32 font-medium">위시리스트</span>
        {/* {data?.totalElements}개 */}
      </p>
      <div className="mt-20">
        {!isError ? (
          <>
            {!isLoading ? (
              <>
                {wishlist.length ? (
                  <ul>
                    {wishlist?.map((v) => (
                      <MyWishlistItem
                        key={v.id}
                        wine={v}
                        removedId={removedId}
                        toggleWishlist={toggleWishlist}
                      />
                    ))}
                  </ul>
                ) : (
                  <p>담긴 위시리스트가 없어요.</p>
                )}
                {hasNextPage && (
                  <div className="text-center">
                    {!isFetchingNextPage ? (
                      <button
                        onClick={() => fetchNextPage()}
                        disabled={isLoading}
                        className="inline-block border rounded-full border-(--gray-78) hover:cursor-pointer mt-50"
                      >
                        <div className="py-10 px-30 text-12">더보기</div>
                      </button>
                    ) : (
                      <ul>
                        {Array.from({ length: 10 }).map((_, i) => (
                          <MyWishlistItemSkeleton key={i} />
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </>
            ) : (
              <ul>
                {Array.from({ length: 10 }).map((_, i) => (
                  <MyWishlistItemSkeleton key={i} />
                ))}
              </ul>
            )}
          </>
        ) : (
          <>error</>
        )}
      </div>
    </div>
  );
};

export default MyWishlist;
