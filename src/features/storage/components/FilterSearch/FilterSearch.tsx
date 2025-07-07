// FilterSearch/FilterSearch.tsx
// 필터를 선택하는 영역을 관리하는 컴포넌트
// 필터의 리스트를 나타내고 초기화 가능
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterDetail } from "./FilterDetail";
import FilterList from "./FilterList";
import { FILTER_TASTE } from "@/constants/Filter";
import { Filter, FilterTaste } from "@/models/Filter";
import { TYPE_ARRAY } from "@/constants/Wine";
import { COUNTRY_ARRAY } from "@/constants/Country";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const FILTER_LABELS: Record<keyof Filter, (value: any) => React.ReactNode> = {
  type: (value) => `${TYPE_ARRAY.find((w) => w.type === value)?.title}`,
  sweetness: (value: keyof FilterTaste["level"]) =>
    `당도: ${FILTER_TASTE.find((t) => t.taste === "sweetness")?.level[value]}`,
  acidity: (value: keyof FilterTaste["level"]) =>
    `산도: ${FILTER_TASTE.find((t) => t.taste === "acidity")?.level[value]}`,
  body: (value: keyof FilterTaste["level"]) =>
    `바디: ${FILTER_TASTE.find((t) => t.taste === "body")?.level[value]}`,
  tannin: (value: keyof FilterTaste["level"]) =>
    `타닌: ${FILTER_TASTE.find((t) => t.taste === "tannin")?.level[value]}`,
  country: (value) => (
    <>
      <span>{COUNTRY_ARRAY.find((c) => c.code === value)?.emoji}</span>
      <span className="ml-5">
        {COUNTRY_ARRAY.find((c) => c.code === value)?.kr}
      </span>
    </>
  ),
};

interface Props {
  filterInfo: Filter;
}

const FilterSearch = ({ filterInfo }: Props) => {
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
    <div className="select-none">
      <div
        onClick={() => setFilterOpen((prev) => !prev)}
        className="flex items-center justify-center gap-2 mt-20 hover:cursor-pointer"
      >
        <span className="text-14">필터</span>
        {filterOpen ? (
          <ChevronUpIcon className="w-14 h-14" />
        ) : (
          <ChevronDownIcon className="w-14 h-14" />
        )}
      </div>
      {filterOpen ? <FilterDetail filterInfo={filterInfo} /> : null}
      {Object.entries(filterInfo).some(([_, arr]) => arr && arr.length > 0) && (
        <div className="w-full px-10 pt-20">
          <div className="flex flex-wrap items-center justify-center w-full gap-5">
            {Object.entries(filterInfo).map(([key, arr]) =>
              Array.isArray(arr)
                ? arr.map((value, idx) => (
                    <FilterList
                      key={value}
                      handleFilterDelete={() =>
                        handleFilterDelete(key as keyof typeof filterInfo, idx)
                      }
                    >
                      {FILTER_LABELS[key as keyof Filter]?.(value)}
                    </FilterList>
                  ))
                : null
            )}
          </div>
          <div className="mt-10 text-center">
            <div
              onClick={handleFilterReset}
              className="inline-flex gap-5 items-center justify-center px-20 py-10 bg-white border rounded-full border-(--gray-f0) hover:cursor-pointer hover:bg-(--gray-f0)"
            >
              <ArrowPathIcon className="w-14 h-14" />
              <span className="text-12 text-nowrap">필터 초기화</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSearch;
