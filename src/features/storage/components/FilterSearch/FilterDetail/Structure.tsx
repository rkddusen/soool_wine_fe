// FilterSearch/FilterDetail/Structure.tsx
// 구조 필터
import { FILTER_TASTE, FILTER_TASTEDEGREE } from "@/constants/Filter";
import { Filter } from "@/models/Filter";
import CheckBox from "./CheckBox";

interface Props {
  check: (string[] | null)[];
  handleCheck: (key: keyof Filter, value: string) => void;
}
const Structure = ({ check, handleCheck }: Props) => {
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
                  {check[i]?.includes(levelKey) ? <CheckBox /> : null}
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

export default Structure;
