// FilterSearch/FilterDetail/CheckBox.tsx
// 필터 각 박스를 체크 표시하는 컴포넌트
import { CheckIcon } from "@heroicons/react/24/outline";

const CheckBox = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="w-full h-full opacity-90 bg-(--gray-e0)"></div>
      <div className="absolute center-absolute">
        <CheckIcon className="w-24 h-24 sm:w-28 sm:h-28" />
      </div>
    </div>
  );
};

export default CheckBox;
