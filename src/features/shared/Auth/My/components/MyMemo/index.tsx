// MyMemo/index.tsx
// 내 메모들을 보여주는 컴포넌트
import MyMemoItem from "./MyMemoItem";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useDeleteMemo } from "@/hooks/memo/useDeleteMemo";
import { getMyMemos } from "../../api";
import MyMemoItemSkeleton from "./MyMemoItemSkeleton";

const MyMemo = () => {
  const queryKey = ["my-memos"];
  const {
    items: allMemo,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteScroll(queryKey, ({ cursorId, cursorDate }) =>
    getMyMemos(cursorId, cursorDate ?? null)
  );
  const deleteMutation = useDeleteMemo(queryKey);

  return (
    <div className="mt-50 px-20 mx-auto md:px-40 max-w-1280">
      <p className="text-16 md:text-20 flex items-center gap-10">
        <span className="text-24 md:text-32 font-medium">내 메모</span>
      </p>
      <div className="mt-20">
        {!isError ? (
          <>
            {!isLoading ? (
              <>
                {allMemo.length ? (
                  <ul>
                    {allMemo?.map((memoData) => (
                      <MyMemoItem
                        key={memoData.clientId}
                        memoData={memoData}
                        deleteMutation={deleteMutation}
                      />
                    ))}
                  </ul>
                ) : (
                  <p>작성한 메모가 없어요.</p>
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
                          <MyMemoItemSkeleton key={i} />
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </>
            ) : (
              <ul>
                {Array.from({ length: 10 }).map((_, i) => (
                  <MyMemoItemSkeleton key={i} />
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

export default MyMemo;
