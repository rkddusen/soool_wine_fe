import { Country, WineType } from "@/models/Wine";
import { ReactNode, useEffect, useState } from "react";
import { WINETYPE, COUNTRY } from "@/data/Filter";
import { Filter } from "@/models/Filter";
import { useSearchParams } from "react-router-dom";
import SearchFilter from "./SearchFilter";

const FILTER_LABELS: Record<string, (value: any) => React.ReactNode> = {
  type: (value) => WineType.get(WINETYPE[value].type)!.kr,
  sweetness: (value) => `당도 ${value}`,
  acidity: (value) => `산도 ${value}`,
  body: (value) => `바디 ${value}`,
  tannin: (value) => `타닌 ${value}`,
  country: (value) => (
    <>
      <span>{Country.get(COUNTRY[value].country)!.emoji}</span>
      <span className="ml-5">{Country.get(COUNTRY[value].country)!.kname}</span>
    </>
  ),
};

interface FilterSectionProps {
  filterInfo: Filter;
}

const FilterSection = ({ filterInfo }: FilterSectionProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKeyword = searchParams.get("search");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    setFilterOpen(false);
  }, [searchKeyword]);

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

  return (
    <>
      <div className="flex flex-row justify-center w-full mt-20">
        <div
          onClick={() => setFilterOpen((prev) => !prev)}
          className="flex items-center hover:cursor-pointer"
        >
          <span className="text-14">필터</span>
          <svg
            className="w-20 h-20"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {filterOpen ? (
              <path d="M18 15l-6-6-6 6" />
            ) : (
              <path d="M6 9l6 6 6-6" />
            )}
          </svg>
        </div>
      </div>
      {filterOpen ? <SearchFilter filterInfo={filterInfo} /> : null}
      {Object.entries(filterInfo).some(([_, arr]) => arr && arr.length > 0) && (
        <div className="w-full px-10 pt-20">
          <div className="flex flex-wrap items-center justify-center w-full gap-5">
            {Object.entries(filterInfo).map(([key, arr]) =>
              Array.isArray(arr)
                ? arr.map((value, idx) => (
                    <FilterInfoDiv
                      key={String(value)}
                      handleFilterDelete={() =>
                        handleFilterDelete(key as keyof typeof filterInfo, idx)
                      }
                    >
                      {FILTER_LABELS[key]?.(value)}
                    </FilterInfoDiv>
                  ))
                : null
            )}
          </div>
          <div className="mt-10 text-center">
            <div
              onClick={handleFilterReset}
              className="inline-flex items-center justify-center px-20 py-10 bg-white border rounded-full border-(--gray-f0) hover:cursor-pointer hover:bg-(--gray-f0)"
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
      )}
    </>
  );
};

interface FilterInfoDivProps {
  handleFilterDelete: () => void;
  children: ReactNode;
}
const FilterInfoDiv = ({
  handleFilterDelete,
  children,
}: FilterInfoDivProps) => {
  return (
    <div className="flex items-center justify-center px-12 py-8 border rounded-5 border-(--light-main) text-12">
      {children}
      <svg
        onClick={handleFilterDelete}
        className="ml-5 stroke-(--gray-78) hover:stroke-black hover:cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </div>
  );
};

export default FilterSection;
