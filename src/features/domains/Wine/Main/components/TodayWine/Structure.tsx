// TodayWine/WineStructure.tsx
// 와인 정보 중 구조를 나타내는 컴포넌트
import { STRUCTURE_LOOKUP, STRUCTURE_DEGREE_ARRAY } from "@/constants/Wine";
import { StructureKey } from "@/models/Wine";

interface StructureProps {
  // 와인 구조
  structure: StructureKey;
  // 각 와인 구조 별 단계
  degree: number | null;
}
const Structure = ({ structure, degree }: StructureProps) => {
  return (
    <div className="flex items-center gap-10">
      <span className="text-14 sm:text-16">
        {STRUCTURE_LOOKUP[structure].title}
      </span>
      {/* 와인 구조 단계 영역 */}
      {degree ? (
        <div className="flex gap-10">
          {STRUCTURE_DEGREE_ARRAY.map(
            (v, i) =>
              i < degree && (
                <div
                  key={v}
                  className={`shrink-0 rounded-full w-12 h-12 sm:w-14 sm:h-14`}
                  style={{ backgroundColor: `var(--${v})` }}
                ></div>
              )
          )}
        </div>
      ) : (
        <p className="text-12 sm:text-14">정보 없음</p>
      )}
    </div>
  );
};

export default Structure;
