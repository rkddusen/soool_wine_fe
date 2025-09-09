// MyMemo/MyMemo.tsx
// 내 메모들을 보여주는 컴포넌트
import MyMemoItem from "./MyMemoItem";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useDeleteMemo } from "@/hooks/memo/useDeleteMemo";
import { getMyMemos } from "../../api";
import LoadingFind from "@/assets/LoadingFind.svg?react";
import LoadingCircle from "@/assets/LoadingCircle.svg?react";

const MyMemo = () => {
  const queryKey = ["my-memos"];
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteScroll(queryKey, ({ pageParam }) => getMyMemos(pageParam));
  const deleteMutation = useDeleteMemo(queryKey);
  const allMemo = data?.pages.flatMap((page) => page.content) ?? [];
  const totalElements = data?.pages[0].totalElements ?? 0;

  return (
    <div className="mt-50 px-20 mx-auto md:px-40 max-w-1280">
      <p className="text-16 md:text-20 flex items-center gap-10">
        <span className="text-24 md:text-32 font-medium">내 메모</span>
        {totalElements}개
      </p>
      <div>
        {!isError ? (
          <>
            {!isLoading ? (
              <>
                {allMemo.length ? (
                  <ul className="mt-20">
                    {allMemo?.map((memoData) => (
                      <MyMemoItem
                        key={memoData.memoId}
                        memoData={memoData}
                        deleteMutation={deleteMutation}
                      />
                    ))}
                  </ul>
                ) : (
                  <p>작성한 메모가 없어요.</p>
                )}
                {hasNextPage && (
                  <div className="text-center mt-50">
                    {!isFetchingNextPage ? (
                      <button
                        onClick={() => fetchNextPage()}
                        disabled={isLoading}
                        className="inline-block border rounded-full border-(--gray-78) hover:cursor-pointer"
                      >
                        <div className="py-10 px-30 text-12">더보기</div>
                      </button>
                    ) : (
                      <div className="flex flex-col items-center mx-auto">
                        <LoadingCircle />
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center gap-10 mx-auto py-100">
                <LoadingFind />
                <p className="text-(--gray-78) text-18">메모 가져오는 중...</p>
              </div>
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
