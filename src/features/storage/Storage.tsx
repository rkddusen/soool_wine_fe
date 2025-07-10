// features/storage/Storage.tsx
// 와인창고 페이지
import NoResultsFound from "@/assets/NoResultsFound.svg?react";
import LoadingWineFind from "@/assets/LoadingWineFind.svg?react";
import LoadingCircle from "@/assets/LoadingCircle.svg?react";
import { SearchArea } from "@/components";
import { FilterSearch, WineListBox } from "./components";
import { useSearchQuery } from "./hooks/useSearchQuery";
import { useFilterQuery } from "./hooks/useFilterQuery";
import { useWines } from "./hooks/useWines";

const Storage = () => {
  const { search } = useSearchQuery();
  const { filter } = useFilterQuery();
  const { fetchNextPage, hasNextPage, isLoading, isFetching, isError, data } =
    useWines(search, filter);
  const wines = data?.pages.flatMap((page) => page.content) ?? [];
  const totalElements = data?.pages[0].totalElements ?? 0;

  return (
    <section>
      <div className="px-20 mx-auto md:px-40 max-w-1280">
        <SearchArea pageTitle={["와인창고"]} />
        <FilterSearch filter={filter} />
      </div>
      {!isError ? (
        <div className="px-20 mx-auto mt-20 md:px-40 max-w-1280">
          {!isLoading ? (
            <>
              <div className="flex items-center px-10 h-60">
                <p className="text-14 text-(--gray-78)">
                  {totalElements} Wines
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-40">
                {wines.length > 0 ? (
                  wines.map((w, i) => (
                    <WineListBox key={i} wine={w} filter={filter} />
                  ))
                ) : (
                  <div className="flex flex-col items-center gap-30 my-100">
                    <NoResultsFound />
                    <p className="text-(--gray-78) text-18">
                      앗! 찾으시는 와인이 없네요.
                    </p>
                  </div>
                )}
              </div>
              {hasNextPage && (
                <div className="text-center mt-50">
                  {!isFetching ? (
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
              <LoadingWineFind />
              <p className="text-(--gray-78) text-18">와인 가져오는 중...</p>
            </div>
          )}
        </div>
      ) : (
        <>error</>
      )}
    </section>
  );
};

export default Storage;
