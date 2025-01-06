import { Country } from "../../models/Wine";
import { useSearchParams } from "react-router-dom";
import { Filter } from "../../models/Filter";

interface SearchFilterComponentProps {
  filterInfo: Filter;
}

const SearchFilter = ({ filterInfo }: SearchFilterComponentProps) => {
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

interface FilterWineTypeComponentProps {
  check: number[] | null;
  handleCheck: (key: keyof Filter, value: number) => void;
}

const FilterWineType = ({
  check,
  handleCheck,
}: FilterWineTypeComponentProps) => {
  const TYPE = ["레드", "화이트", "로제", "스파클링", "기타"];
  const COLOR = [
    "fill-red-wine",
    "fill-white-wine",
    "fill-rose-wine",
    "fill-sparkling-wine",
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
            className="relative flex flex-col items-center justify-center overflow-hidden bg-white border border-f0-gray sm:w-100 sm:h-100 w-80 h-80 rounded-15 hover:cursor-pointer"
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

interface FilterTasteComponentProps {
  check: (number[] | null)[];
  handleCheck: (key: keyof Filter, value: number) => void;
}
const FilterTaste = ({ check, handleCheck }: FilterTasteComponentProps) => {
  const TASTE: (keyof Filter)[] = ["sweetness", "acidity", "body", "tannin"];
  const TASTE_KR = ["당도", "산도", "바디", "타닌"];
  const DEGREE = [
    "text-very-light-degree",
    "text-light-degree",
    "text-medium-degree",
    "text-full-degree",
    "text-very-full-degree",
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
                  className="relative flex items-center justify-center overflow-hidden bg-white border rounded-full w-30 h-30 sm:w-40 sm:h-40 border-f0-gray hover:cursor-pointer"
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

interface FilterCountryComponentProps {
  check: number[] | null;
  handleCheck: (key: keyof Filter, value: number) => void;
}
const FilterCountry = ({ check, handleCheck }: FilterCountryComponentProps) => {
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
              className="relative flex items-center justify-center overflow-hidden bg-white border w-70 h-70 rounded-15 border-f0-gray hover:cursor-pointer"
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
      <div className="w-full h-full opacity-50 bg-c0-gray"></div>
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

export default SearchFilter;
