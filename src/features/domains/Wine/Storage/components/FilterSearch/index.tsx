// FilterSearch/index.tsx
// 필터를 선택하는 영역을 관리하는 컴포넌트
// 필터의 리스트를 나타내고 초기화 가능
import { useEffect, useState } from "react";
import FilterDetail from "./FilterDetail";
import FilterList from "./FilterList";
import { Filter, FILTER_KEYS } from "@/models/Filter";
import { useFilterQuery } from "../../hooks/useFilterQuery";
import { useSearchQuery } from "../../hooks/useSearchQuery";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

interface FilterSearchProps {
  // 필터 객체
  filter: Filter;
}

const FilterSearch = ({ filter }: FilterSearchProps) => {
  const { search } = useSearchQuery();
  const { selectFilter, resetFilter } = useFilterQuery();
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  useEffect(() => {
    setFilterOpen(false);
  }, [search]);

  return (
    <div className="select-none text-center">
      <div
        onClick={() => setFilterOpen((prev) => !prev)}
        className="inline-flex items-center justify-center gap-2 mt-20 hover:cursor-pointer"
      >
        <span className="text-14">필터</span>
        {filterOpen ? (
          <ChevronUpIcon className="w-14 h-14" />
        ) : (
          <ChevronDownIcon className="w-14 h-14" />
        )}
      </div>
      {filterOpen && (
        <>
          <FilterDetail filter={filter} />
          <div
            onClick={() => setFilterOpen((prev) => !prev)}
            className="inline-flex items-center justify-center gap-2 mt-20 hover:cursor-pointer"
          >
            <span className="text-14">필터</span>
            {filterOpen ? (
              <ChevronUpIcon className="w-14 h-14" />
            ) : (
              <ChevronDownIcon className="w-14 h-14" />
            )}
          </div>
        </>
      )}
      {/* 필터링 된 항목이 있으면 리스트 표시 */}
      {Object.entries(filter).some(([_, arr]) => arr.length > 0) && (
        <div className="w-full px-10 pt-20">
          <div className="flex flex-wrap items-center justify-center w-full gap-5">
            {FILTER_KEYS.map((filterKey) =>
              filter[filterKey].map((value) => (
                <FilterList
                  key={value}
                  filterKey={filterKey}
                  filterValue={value}
                  onDelete={() =>
                    selectFilter(filterKey as keyof typeof filter, value)
                  }
                />
              ))
            )}
          </div>
          <div className="mt-10 text-center">
            <div
              onClick={resetFilter}
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
