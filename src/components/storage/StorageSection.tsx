import { useEffect, useState } from "react";
import SearchBar from "@/components/common/SearchBar";
import { getWines } from "@/utils/api";
import { WinesResponse } from "@/models/Api";
import { useSearchParams } from "react-router-dom";
import { Filter } from "@/models/Filter";
import NoResultsFound from "/src/assets/noResultsFound.svg?react";
import {
  getFilterFromQueryParams,
  setQueryParamsFromFilter,
} from "@/utils/queryParams";
import { validateFilter } from "@/utils/validateFilter";
import FilterSection from "./FilterSection";
import WineListBox from "./WineListBox";
import { useInfiniteQuery } from "@tanstack/react-query";

const initFilter: Filter = {
  type: null,
  sweetness: null,
  acidity: null,
  body: null,
  tannin: null,
  country: null,
};

const StorageSection = () => {
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

  const { fetchNextPage, hasNextPage, isLoading, isError, data } =
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
    <div>
      <section className="px-20 mx-auto md:px-40 max-w-1280">
        <div className="pb-20 text-center pt-50 sm:pt-70 sm:pb-50">
          <p className="md:text-84 sm:text-64 text-48 font-display text-(--main)">
            와인창고
          </p>
        </div>
        <div className="mx-auto max-w-600 h-55">
          <div className="w-full h-full border-1 border-(--main) rounded-30">
            <SearchBar />
          </div>
        </div>
        <FilterSection filterInfo={filterInfo} />
      </section>
      {!isError ? (
        <section className="px-20 mx-auto mt-20 md:px-40 max-w-1280">
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
              {hasNextPage ? (
                <div className="text-center mt-50">
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isLoading}
                    className="inline-block border rounded-full border-(--gray-78) hover:cursor-pointer"
                  >
                    <div className="py-10 px-30 text-12">더보기</div>
                  </button>
                </div>
              ) : (
                <p>데이터를 가져오는 중입니다.</p>
              )}
            </>
          ) : (
            <>Loading</>
          )}
        </section>
      ) : (
        <>error</>
      )}
    </div>
  );
};

export default StorageSection;
