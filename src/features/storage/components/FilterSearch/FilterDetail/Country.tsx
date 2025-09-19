// FilterSearch/FilterDetail/Country.tsx
// 나라 필터
import CheckBox from "./CheckBox";
import { Filter } from "@/models/Filter";
import { COUNTRY_ARRAY } from "@/constants/Country";

interface CountryProps {
  // 필터 선택 여부
  check: string[];
  // 필터 선택 함수
  selectFilter: (key: keyof Filter, value: string) => void;
}
const Country = ({ check, selectFilter }: CountryProps) => {
  return (
    <div className="mt-40 text-center">
      <p className="mb-20 font-medium text-25">Country</p>
      <ul className="flex flex-wrap justify-center gap-10 px-10">
        {COUNTRY_ARRAY.map((v, i) => (
          <li
            key={i}
            className="flex flex-col items-center max-w-full p-10 sm:w-150 w-120"
          >
            <div
              onClick={() => selectFilter("country", v.code)}
              className="relative flex items-center justify-center overflow-hidden bg-white border w-70 h-70 rounded-15 border-(--gray-f0) hover:cursor-pointer"
            >
              {check.includes(v.code) ? <CheckBox /> : null}
              <span className="text-32">{v.emoji}</span>
            </div>
            <span className="mt-5 text-12 sm:text-14">{v.kr}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Country;
