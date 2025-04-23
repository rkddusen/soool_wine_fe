import { useEffect, useState } from "react";
import SearchBar from "@/components/common/SearchBar";
import { WineWithWinery } from "@/models/Wine";
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

const initFilter: Filter = {
  type: null,
  sweetness: null,
  acidity: null,
  body: null,
  tannin: null,
  country: null,
};

const StorageSection = () => {
  const [wineList, setWineList] = useState<WineWithWinery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const [filterInfo, setFilterInfo] = useState<Filter>(initFilter);

  const getWineData = async (
    pageIndex: number,
    search: string | null,
    filter: Filter
  ) => {
    try {
      const { content, totalElements, totalPages }: WinesResponse =
        await getWines(pageIndex, search, filter);
      setWineList((prev) => [...prev, ...content]);
      setTotalElements(totalElements);
      setTotalPages(totalPages);
    } catch (error) {
      setError("Error getWineData");
      console.log("Error getWineData: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (page: number, filter: Filter): void => {
    if (validateFilter(filter)) {
      getWineData(page, searchParams.get("search"), filter);
      setFilterInfo(filter);
    } else {
      setQueryParamsFromFilter(searchParams, filter);
    }
  };

  useEffect(() => {
    setWineList([]);
    setPage(1);
    const filter = getFilterFromQueryParams(searchParams);
    handleFilterChange(1, filter);
  }, [searchParams]);

  const handleViewMore = (): void => {
    if (page + 1 <= totalPages) {
      setPage(page + 1);
      getWineData(page + 1, searchParams.get("search"), filterInfo);
    }
  };

  if (loading) return <div>Loading</div>;
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
      {!error ? (
        <section className="px-20 mx-auto mt-20 md:px-40 max-w-1280">
          <div className="flex items-center px-10 h-60">
            <p className="text-14 text-(--gray-78)">{totalElements} Wines</p>
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
          {page + 1 <= totalPages ? (
            <div className="text-center mt-50">
              <div
                onClick={handleViewMore}
                className="inline-block border rounded-full border-(--gray-78) hover:cursor-pointer"
              >
                <div className="py-10 px-30 text-12">더보기</div>
              </div>
            </div>
          ) : null}
        </section>
      ) : (
        <></>
      )}
    </div>
  );
};

export default StorageSection;
