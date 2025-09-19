// FilterSearch/FilterDetail/FilterDetail.tsx
// 필터 영역을 나타내는 컴포넌트
import { Filter } from "@/models/Filter";
import Type from "./Type";
import Structure from "./Structure";
import Country from "./Country";
import { useFilterQuery } from "../../../hooks/useFilterQuery";

interface FilterDetailProps {
  // 필터 객체
  filter: Filter;
}
const FilterDetail = ({ filter }: FilterDetailProps) => {
  const { selectFilter } = useFilterQuery();

  return (
    <div className="w-full py-40">
      <Type check={filter.type} selectFilter={selectFilter} />
      <Structure
        check={[filter.sweetness, filter.acidity, filter.body, filter.tannin]}
        selectFilter={selectFilter}
      />
      <Country check={filter.country} selectFilter={selectFilter} />
    </div>
  );
};

export default FilterDetail;
