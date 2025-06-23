import { useSearchParams } from "react-router-dom";
import { Filter } from "@/models/Filter";
import { FILTER_TASTE, FILTER_TASTEDEGREE } from "@/data/Filter";
import { WINETYPE_ARRAY } from "@/data/Wine";
import { COUNTRY_ARRAY } from "@/data/Country";
import WineIcon from "@/assets/WineIcon.svg?react";
import { CheckIcon } from "@heroicons/react/24/outline";

interface SearchFilterProps {
  filterInfo: Filter;
}
const SearchFilter = ({ filterInfo }: SearchFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCheck = (key: keyof Filter, value: string): void => {
    const keyParams = filterInfo[key] ?? [];
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
  check: string[] | null;
  handleCheck: (key: keyof Filter, value: string) => void;
}

const FilterWineType = ({ check, handleCheck }: FilterWineTypeProps) => {
  return (
    <div className="text-center">
      <p className="mb-20 font-bold text-25">Wine Type</p>
      <ul className="flex flex-wrap justify-center w-full gap-10 px-10">
        {WINETYPE_ARRAY.map((v, i) => (
          <li
            onClick={() => handleCheck("type", v.type)}
            key={i}
            className="relative flex flex-col gap-10 items-center justify-center overflow-hidden bg-white border border-(--gray-f0) sm:w-100 sm:h-100 w-80 h-80 rounded-15 hover:cursor-pointer"
          >
            {check?.includes(v.type) ? <CheckFilter /> : null}
            <WineIcon className={`w-21 h-28 sm:w-24 sm:h-32 ${v.fill}`} />
            <p className="text-12 sm:text-14">{v.title.split(" ")[0]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface FilterTasteProps {
  check: (string[] | null)[];
  handleCheck: (key: keyof Filter, value: string) => void;
}
const FilterTaste = ({ check, handleCheck }: FilterTasteProps) => {
  return (
    <div className="mt-40 text-center">
      <p className="mb-20 font-bold text-25">Wine Taste</p>
      <ul className="flex flex-col items-center justify-center grid-cols-2 px-10 md:inline-grid gap-x-60">
        {FILTER_TASTE.map((v, i) => (
          <li key={i} className="px-10 text-center mb-50">
            <p className="mb-5 text-14">[{v.kr}]</p>
            <div className="flex flex-wrap justify-center gap-10">
              {Object.entries(v.level).map(([levelKey, label], i2) => (
                <div
                  onClick={() => handleCheck(v.taste, levelKey)}
                  key={label}
                  className="relative flex items-center justify-center overflow-hidden bg-white border rounded-full w-65 h-30 sm:w-80 sm:h-40 border-(--gray-f0) hover:cursor-pointer"
                >
                  {check[i]?.includes(levelKey) ? <CheckFilter /> : null}
                  <span
                    className={`${FILTER_TASTEDEGREE[i2]} text-12 sm:text-14`}
                  >
                    {label}
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
  check: string[] | null;
  handleCheck: (key: keyof Filter, value: string) => void;
}
const FilterCountry = ({ check, handleCheck }: FilterCountryProps) => {
  return (
    <div className="mt-40 text-center">
      <p className="mb-20 font-bold text-25">Country</p>
      <ul className="flex flex-wrap justify-center gap-10 px-10">
        {COUNTRY_ARRAY.map((v, i) => (
          <li
            key={i}
            className="flex flex-col items-center max-w-full p-10 sm:w-150 w-120"
          >
            <div
              onClick={() => handleCheck("country", v.code)}
              className="relative flex items-center justify-center overflow-hidden bg-white border w-70 h-70 rounded-15 border-(--gray-f0) hover:cursor-pointer"
            >
              {check?.includes(v.code) ? <CheckFilter /> : null}
              <span className="text-32">{v.emoji}</span>
            </div>
            <span className="mt-5 text-12 sm:text-14">{v.kr}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CheckFilter = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="w-full h-full opacity-90 bg-(--gray-e0)"></div>
      <div className="absolute center-absolute">
        <CheckIcon className="w-24 h-24 sm:w-28 sm:h-28" />
      </div>
    </div>
  );
};

export default SearchFilter;
