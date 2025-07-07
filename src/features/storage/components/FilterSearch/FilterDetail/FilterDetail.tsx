// FilterSearch/FilterDetail/FilterDetail.tsx
// 필터 영역을 나타내는 컴포넌트
import { useSearchParams } from "react-router-dom";
import { Filter } from "@/models/Filter";
import Type from "./Type";
import Structure from "./Structure";
import Country from "./Country";

interface Props {
  filterInfo: Filter;
}
const FilterDetail = ({ filterInfo }: Props) => {
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
      <Type check={filterInfo.type} handleCheck={handleCheck} />
      <Structure
        check={[
          filterInfo.sweetness,
          filterInfo.acidity,
          filterInfo.body,
          filterInfo.tannin,
        ]}
        handleCheck={handleCheck}
      />
      <Country check={filterInfo.country} handleCheck={handleCheck} />
    </div>
  );
};

export default FilterDetail;
