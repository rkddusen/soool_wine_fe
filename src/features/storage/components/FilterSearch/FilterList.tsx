// FilterSearch/FilterList.tsx
// 필터의 리스트를 표시하는 컴포넌트
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

interface Props {
  handleFilterDelete: () => void;
  children: ReactNode;
}
const FilterList = ({ handleFilterDelete, children }: Props) => {
  return (
    <div className="flex items-center justify-center gap-5 px-12 py-8 border rounded-5 border-(--light-main) text-12">
      {children}
      <XMarkIcon
        onClick={handleFilterDelete}
        className="w-14 h-14 stroke-(--gray-78) hover:stroke-black hover:cursor-pointer"
      />
    </div>
  );
};

export default FilterList;
