import { Country, WineType } from "@/models/Wine";
import { useSearchParams } from "react-router-dom";
import { Filter } from "@/models/Filter";
import { ReactNode, useEffect, useState } from "react";
import { TYPE, COUNTRY } from "@/data/Filter";

const FILTER_LABELS: Record<string, (value: any) => React.ReactNode> = {
  type: (value) => WineType.get(TYPE[value])!.kr,
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

interface SearchFilterProps {
  filterInfo: Filter;
}

const SearchFilter = ({ filterInfo }: SearchFilterProps) => {
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
      {filterOpen ? <FilterList filterInfo={filterInfo} /> : null}
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

interface FilterListProps {
  filterInfo: Filter;
}
const FilterList = ({ filterInfo }: FilterListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCheck = (key: keyof Filter, value: number): void => {
    const keyParams = filterInfo[key] || [];
    const updatedKeyParams = new Set(keyParams);

    updatedKeyParams.has(value)
      ? updatedKeyParams.delete(value)
      : updatedKeyParams.add(value);

    if (updatedKeyParams.size) {
      searchParams.set(key, Array.from(updatedKeyParams).join(","));
    } else {
      searchParams.delete(key);
    }

    const sortedSearchParams = new URLSearchParams(
      Array.from(searchParams.entries()).sort((a, b) =>
        a[0].localeCompare(b[0])
      )
    );
    setSearchParams(sortedSearchParams);
  };

  return (
    <div className="w-full py-40">
      <FilterWineType check={filterInfo.type} handleCheck={handleCheck} />
      <FilterTaste
        check={[
          filterInfo.sweetness,
          filterInfo.acidity,
          filterInfo.body,
          filterInfo.tannin,
        ]}
        handleCheck={handleCheck}
      />
      <FilterCountry check={filterInfo.country} handleCheck={handleCheck} />
    </div>
  );
};

interface FilterWineTypeProps {
  check: number[] | null;
  handleCheck: (key: keyof Filter, value: number) => void;
}

const FilterWineType = ({ check, handleCheck }: FilterWineTypeProps) => {
  const TYPE = ["레드", "화이트", "로제", "스파클링", "기타"];
  const COLOR = [
    "fill-(--red-wine)",
    "fill-(--white-wine)",
    "fill-(--rose-wine)",
    "fill-(--sparkling-wine)",
    "fill-black",
  ];

  return (
    <div className="w-full text-center">
      <p className="mb-20 font-bold text-25">Wine Type</p>
      <ul className="flex flex-wrap justify-center w-full gap-10 px-10">
        {TYPE.map((v, i) => (
          <li
            onClick={() => handleCheck("type", i)}
            key={i}
            className="relative flex flex-col items-center justify-center overflow-hidden bg-white border border-(--gray-f0) sm:w-100 sm:h-100 w-80 h-80 rounded-15 hover:cursor-pointer"
          >
            {check?.includes(i) ? <CheckFilter /> : null}
            <svg
              className={`w-21 h-28 sm:w-24 sm:h-32 mb-10 ${COLOR[i]}`}
              viewBox="0 0 36 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M35.8356 3.865V2C35.8356 1.46957 35.646 0.96086 35.3084 0.585787C34.9709 0.210714 34.5132 0 34.0359 0H1.96513C1.48782 0 1.03006 0.210714 0.692546 0.585787C0.355036 0.96086 0.165425 1.46957 0.165425 2V3.865C0.0012024 5.28625 -0.920022 15.2075 4.31937 21.9513C7.11678 25.5513 11.1088 27.5575 16.2008 27.9338V44H7.20227C6.72496 44 6.2672 44.2107 5.92969 44.5858C5.59218 44.9609 5.40257 45.4696 5.40257 46C5.40257 46.5304 5.59218 47.0391 5.92969 47.4142C6.2672 47.7893 6.72496 48 7.20227 48H28.7987C29.276 48 29.7338 47.7893 30.0713 47.4142C30.4088 47.0391 30.5984 46.5304 30.5984 46C30.5984 45.4696 30.4088 44.9609 30.0713 44.5858C29.7338 44.2107 29.276 44 28.7987 44H19.8002V27.9338C24.8922 27.5588 28.8842 25.5513 31.6816 21.9513C36.921 15.2075 35.9975 5.28625 35.8356 3.865ZM3.74459 4.29125C3.75808 4.19489 3.76485 4.09752 3.76483 4H32.2362C32.2361 4.09752 32.2429 4.19489 32.2564 4.29125C32.4507 6.18804 32.4507 8.10321 32.2564 10H3.75134C3.55709 8.10334 3.55483 6.18847 3.74459 4.29125Z" />
            </svg>
            <p className="text-12 sm:text-14">{v}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface FilterTasteProps {
  check: (number[] | null)[];
  handleCheck: (key: keyof Filter, value: number) => void;
}
const FilterTaste = ({ check, handleCheck }: FilterTasteProps) => {
  const TASTE: (keyof Filter)[] = ["sweetness", "acidity", "body", "tannin"];
  const TASTE_KR = ["당도", "산도", "바디", "타닌"];
  const DEGREE = [
    "text-(--very-light-degree)",
    "text-(--light-degree)",
    "text-(--medium-degree)",
    "text-(--full-degree)",
    "text-(--very-full-degree)",
  ];

  return (
    <div className="w-full mt-40 text-center">
      <p className="mb-20 font-bold text-25">Wine Taste</p>
      <ul className="flex flex-col items-center justify-center grid-cols-2 px-10 md:inline-grid gap-x-60">
        {TASTE.map((v, i) => (
          <li key={i} className="px-10 text-center mb-50">
            <p className="mb-5">[{TASTE_KR[i]}]</p>
            <div className="flex flex-wrap justify-center gap-10">
              {Array.from({ length: 5 }).map((_, i2) => (
                <div
                  onClick={() => handleCheck(v, i2 + 1)}
                  key={i2}
                  className="relative flex items-center justify-center overflow-hidden bg-white border rounded-full w-30 h-30 sm:w-40 sm:h-40 border-(--gray-f0) hover:cursor-pointer"
                >
                  {check[i]?.includes(i2 + 1) ? <CheckFilter /> : null}
                  <span className={`${DEGREE[i2]} text-12 sm:text-14`}>
                    {i2 + 1}
                  </span>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface FilterCountryProps {
  check: number[] | null;
  handleCheck: (key: keyof Filter, value: number) => void;
}
const FilterCountry = ({ check, handleCheck }: FilterCountryProps) => {
  const COUNTRY = Array.from(Country, ([key, value]) => ({
    country: key,
    ...value,
  }));

  return (
    <div className="w-full mt-40 text-center">
      <p className="mb-20 font-bold text-25">Country</p>
      <ul className="flex flex-wrap justify-center gap-10 px-10">
        {COUNTRY.map((v, i) => (
          <li
            key={i}
            className="flex flex-col items-center max-w-full p-10 sm:w-150 w-120"
          >
            <div
              onClick={() => handleCheck("country", i)}
              className="relative flex items-center justify-center overflow-hidden bg-white border w-70 h-70 rounded-15 border-(--gray-f0) hover:cursor-pointer"
            >
              {check?.includes(i) ? <CheckFilter /> : null}
              <span className="text-30">{v.emoji}</span>
            </div>
            <span className="mt-5 text-12 sm:text-14">{v.kname}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CheckFilter = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="w-full h-full opacity-50 bg-(--gray-c0)"></div>
      <div className="absolute center-absolute">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-18 h-18 sm:w-24 sm:h-24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
        >
          <polyline
            points="20 6 9 17 4 12"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
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

export default SearchFilter;
