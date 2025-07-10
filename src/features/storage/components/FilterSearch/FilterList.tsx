// FilterSearch/FilterList.tsx
// 필터의 리스트를 표시하는 컴포넌트
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FILTER_LABELS } from "@/constants/Filter";
import { FilterKey } from "@/models/Filter";

interface FilterListProps {
  // 필터 키
  filterKey: FilterKey;
  // 필터 값
  filterValue: string;
  // 필터 삭제 함수
  onDelete: () => void;
}
const FilterList = ({ filterKey, filterValue, onDelete }: FilterListProps) => {
  return (
    <div className="flex items-center justify-center gap-5 px-12 py-8 border rounded-5 border-(--light-main) text-12">
      {FILTER_LABELS[filterKey]?.(filterValue)}
      <XMarkIcon
        onClick={onDelete}
        className="w-14 h-14 stroke-(--gray-78) hover:stroke-black hover:cursor-pointer"
      />
    </div>
  );
};

export default FilterList;
