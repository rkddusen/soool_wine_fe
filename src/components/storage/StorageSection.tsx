import { ReactNode, useEffect, useState } from "react";
import SearchBar from "../common/SearchBar";
import { WineType, WineWithWinery, Country } from "../../models/Wine";
import WineListBox from "./WineListBox";
import { AxiosResponse } from "axios";
import { getWine } from "../../utils/api";
import { WineApiResponse } from "../../models/Api";
import { useSearchParams } from "react-router-dom";
import SearchFilter from "./SearchFilter";
import { Filter } from "../../models/Filter";
import NoResultsFound from "/src/assets/noResultsFound.svg?react";
import {
  getFilterFromQueryParams,
  setQueryParamsFromFilter,
} from "../../utils/queryParams";
import { validateFilter } from "../../utils/validateFilter";

const initFilter: Filter = {
  type: null,
  sweetness: null,
  acidity: null,
  body: null,
  tannin: null,
  country: null,
};
const TYPE = ["red", "white", "rose", "sparkling", "etc"];
const COUNTRY = Array.from(Country, ([key, value]) => ({
  country: key,
  ...value,
}));
const StorageSection = () => {
  const [wineList, setWineList] = useState<WineWithWinery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [filterInfo, setFilterInfo] = useState<Filter>(initFilter);

  const getWineData = async (
    pageIndex: number,
    search: string | null,
    filter: Filter
  ) => {
    try {
      const response: AxiosResponse<WineApiResponse> = await getWine(
        pageIndex,
        search,
        filter
      );
      setWineList((prev) => [...prev, ...response.data.content]);
      setTotalElements(response.data.totalElements);
      setTotalPages(response.data.totalPages);
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
    setSearchKeyword(searchParams.get("search"));
    const filter = getFilterFromQueryParams(searchParams);
    handleFilterChange(1, filter);
  }, [searchParams]);

  useEffect(() => {
    setFilterOpen(false);
  }, [searchKeyword]);

  const handleViewMore = (): void => {
    if (page + 1 <= totalPages) {
      setPage(page + 1);
      getWineData(page + 1, searchParams.get("search"), filterInfo);
    }
  };

  const handleFilterOpen = () => {
    setFilterOpen((prev) => !prev);
  };

  const handleFilterReset = () => {
    searchParams.delete("type");
    searchParams.delete("sweetness");
    searchParams.delete("acidity");
    searchParams.delete("body");
    searchParams.delete("tannin");
    searchParams.delete("country");
    setSearchParams(searchParams);
  };

  const handleFilterDelete = (key: string, index: number): void => {
    const value = searchParams.get(key)!;
    const deletedValue = value.split(",");
    deletedValue.splice(index, 1);

    if (deletedValue.length === 0) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, deletedValue.join(","));
    }

    setSearchParams(searchParams);
  };

  if (loading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;
  return (
    <>
      <div className="w-full py-70 rounded-15 bg-lighter-main">
        <div className="mb-40 text-center">
          <span className="text-30">와인창고</span>
        </div>
        <div className="w-full px-20 mx-auto max-w-600 h-60">
          <div className="w-full h-full border-1 border-main rounded-30">
            <SearchBar />
          </div>
        </div>
        <div className="flex flex-row justify-center w-full mt-20">
          <div
            onClick={handleFilterOpen}
            className="flex items-center hover:cursor-pointer"
          >
            <span className="text-14">필터</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {filterOpen ? (
                <path
                  d="M18 15l-6-6-6 6"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M6 9l6 6 6-6"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </div>
        </div>
        {filterOpen ? <SearchFilter filterInfo={filterInfo} /> : null}
        {filterInfo.type ||
        filterInfo.sweetness ||
        filterInfo.acidity ||
        filterInfo.body ||
        filterInfo.tannin ||
        filterInfo.country ? (
          <div className="w-full px-10 pt-20">
            <div className="flex flex-wrap items-center justify-center w-full gap-5">
              {filterInfo.type &&
                filterInfo.type.map((v, i) => (
                  <FilterInfoDiv
                    handleFilterDelete={() => handleFilterDelete("type", i)}
                    key={i}
                  >
                    {WineType.get(TYPE[v])!.kr}
                  </FilterInfoDiv>
                ))}
              {filterInfo.sweetness &&
                filterInfo.sweetness.map((v, i) => (
                  <FilterInfoDiv
                    handleFilterDelete={() =>
                      handleFilterDelete("sweetness", i)
                    }
                    key={i}
                  >
                    당도 {v}
                  </FilterInfoDiv>
                ))}
              {filterInfo.acidity &&
                filterInfo.acidity.map((v, i) => (
                  <FilterInfoDiv
                    handleFilterDelete={() => handleFilterDelete("acidity", i)}
                    key={i}
                  >
                    산도 {v}
                  </FilterInfoDiv>
                ))}
              {filterInfo.body &&
                filterInfo.body.map((v, i) => (
                  <FilterInfoDiv
                    handleFilterDelete={() => handleFilterDelete("body", i)}
                    key={i}
                  >
                    바디 {v}
                  </FilterInfoDiv>
                ))}
              {filterInfo.tannin &&
                filterInfo.tannin.map((v, i) => (
                  <FilterInfoDiv
                    handleFilterDelete={() => handleFilterDelete("tannin", i)}
                    key={i}
                  >
                    타닌 {v}
                  </FilterInfoDiv>
                ))}
              {filterInfo.country &&
                filterInfo.country.map((v, i) => (
                  <FilterInfoDiv
                    handleFilterDelete={() => handleFilterDelete("country", i)}
                    key={i}
                  >
                    <span>{Country.get(COUNTRY[v].country)!.emoji}</span>
                    <span className="ml-5">
                      {Country.get(COUNTRY[v].country)!.kname}
                    </span>
                  </FilterInfoDiv>
                ))}
            </div>
            <div className="mt-10 text-center">
              <div
                onClick={handleFilterReset}
                className="inline-flex items-center justify-center px-20 py-10 bg-white border rounded-full border-f0-gray hover:cursor-pointer hover:bg-f0-gray"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                >
                  <path
                    d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="ml-5 text-12 text-nowrap">필터 초기화</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="w-full">
        <div className="w-full pt-10">
          <div className="flex flex-row items-center justify-between w-full px-10 mx-auto h-60">
            <span className="text-14 text-78-gray">{totalElements} Wines</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-center w-full gap-40">
          {wineList.length > 0 ? (
            wineList.map((w, i) => (
              <WineListBox key={i} wine={w} filterInfo={filterInfo} />
            ))
          ) : (
            <div className="flex flex-col items-center gap-20 my-100">
              <NoResultsFound />
              <p className="text-78-gray text-18">
                앗! 찾으시는 와인이 없네요.
              </p>
            </div>
          )}
        </div>
      </div>
      {page + 1 <= totalPages ? (
        <div className="w-full text-center mt-50">
          <div
            onClick={handleViewMore}
            className="inline-block border rounded-full border-78-gray hover:cursor-pointer"
          >
            <div className="py-10 px-30 text-12">더보기</div>
          </div>
        </div>
      ) : null}
    </>
  );
};

interface FilterInfoDivComponentProps {
  handleFilterDelete: () => void;
  children: ReactNode;
}
const FilterInfoDiv = ({
  handleFilterDelete,
  children,
}: FilterInfoDivComponentProps) => {
  return (
    <div className="flex items-center justify-center px-12 py-8 border rounded-5 border-light-main text-12">
      {children}
      <svg
        onClick={handleFilterDelete}
        className="ml-5 stroke-78-gray hover:stroke-black hover:cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
      >
        <line
          x1="18"
          y1="6"
          x2="6"
          y2="18"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></line>
        <line
          x1="6"
          y1="6"
          x2="18"
          y2="18"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></line>
      </svg>
    </div>
  );
};

export default StorageSection;
