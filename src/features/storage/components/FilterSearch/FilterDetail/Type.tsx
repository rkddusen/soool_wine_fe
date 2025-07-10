// FilterSearch/FilterDetail/Type.tsx
// 타입 필터
import { TYPE_ARRAY } from "@/constants/Wine";
import { Filter } from "@/models/Filter";
import WineIcon from "@/assets/WineIcon.svg?react";
import CheckBox from "./CheckBox";

interface TypeProps {
  // 필터 선택 여부
  check: string[];
  // 필터 선택 함수
  selectFilter: (key: keyof Filter, value: string) => void;
}

const Type = ({ check, selectFilter }: TypeProps) => {
  return (
    <div className="text-center">
      <p className="mb-20 font-bold text-25">Wine Type</p>
      <ul className="flex flex-wrap justify-center w-full gap-10 px-10">
        {TYPE_ARRAY.map((v, i) => (
          <li
            onClick={() => selectFilter("type", v.type)}
            key={i}
            className="relative flex flex-col gap-10 items-center justify-center overflow-hidden bg-white border border-(--gray-f0) sm:w-100 sm:h-100 w-80 h-80 rounded-15 hover:cursor-pointer"
          >
            {check.includes(v.type) ? <CheckBox /> : null}
            <WineIcon
              className={`w-21 h-28 sm:w-24 sm:h-32`}
              style={{ fill: `var(--${v.type}-wine)` }}
            />
            <p className="text-12 sm:text-14">{v.title.split(" ")[0]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Type;
