// features/storage/Storage.tsx
// 와인창고 페이지
import { useEffect, useState } from "react";
import { getWines } from "@/utils/api";
import { WinesResponse } from "@/models/Api";
import { useSearchParams } from "react-router-dom";
import { Filter } from "@/models/Filter";
import NoResultsFound from "/src/assets/NoResultsFound.svg?react";
import {
  getFilterFromQueryParams,
  setQueryParamsFromFilter,
} from "@/utils/queryParams";
import { validateFilter } from "@/utils/validateFilter";
import { FilterSearch, WineListBox } from "./components";
import { useInfiniteQuery } from "@tanstack/react-query";
import LoadingWineFind from "/src/assets/LoadingWineFind.svg?react";
import LoadingCircle from "/src/assets/LoadingCircle.svg?react";
import { SearchArea } from "@/components";

const initFilter: Filter = {
  type: null,
  sweetness: null,
  acidity: null,
  body: null,
  tannin: null,
  country: null,
};

const Storage = () => {
  const [searchParams] = useSearchParams();
  const [filterInfo, setFilterInfo] = useState<Filter>(initFilter);
  const search = searchParams.get("search");

  const callGetWines = async ({
    page,
    search,
    filter,
  }: {
    page: number;
    search: string | null;
    filter: Filter;
  }): Promise<WinesResponse> => {
    const { content, totalElements, totalPages }: WinesResponse =
      await getWines(page, search, filter);
    return { content, totalElements, totalPages };
  };

  const { fetchNextPage, hasNextPage, isLoading, isFetching, isError, data } =
    useInfiniteQuery({
      queryKey: ["wines", search, JSON.stringify(filterInfo)],
      queryFn: ({ pageParam }) =>
        callGetWines({ page: pageParam, search, filter: filterInfo }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.totalPages > allPages.length) {
          return allPages.length + 1;
        }
        return undefined;
      },
    });
  const wineList = data?.pages.flatMap((page) => page.content) ?? [];
  const totalElements = data?.pages[0].totalElements ?? 0;

  const handleFilterChange = (filter: Filter): void => {
    if (validateFilter(filter)) {
      setFilterInfo(filter);
    } else {
      setQueryParamsFromFilter(searchParams, filter);
    }
  };

  useEffect(() => {
    const filter = getFilterFromQueryParams(searchParams);
    handleFilterChange(filter);
  }, [searchParams.toString()]);

  return (
    <section>
      <div className="px-20 mx-auto md:px-40 max-w-1280">
        <SearchArea pageTitle={["와인창고"]} />
        <FilterSearch filterInfo={filterInfo} />
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
                {wineList.length > 0 ? (
                  wineList.map((w, i) => (
                    <WineListBox key={i} wine={w} filterInfo={filterInfo} />
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
