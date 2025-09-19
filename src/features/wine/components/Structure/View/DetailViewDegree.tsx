// Structure/View/DetailViewDegree.tsx
// 와인 구조의 디테일뷰 부분
import { STRUCTURE_DEGREE_ARRAY, STRUCTURE_LOOKUP } from "@/constants/Wine";
import { StructureKey } from "@/models/Wine";

interface DetailViewDegreeProps {
  degree: number | null;
  label: StructureKey;
}

const DetailViewDegree = ({ degree, label }: DetailViewDegreeProps) => {
  return (
    <div>
      <p className="text-center">{STRUCTURE_LOOKUP[label].title}</p>
      <div className="mt-5">
        <div className="relative w-full h-12 bg-(--gray-f0) rounded-full overflow-hidden">
          {degree && (
            <>
              {degree >= 1 && (
                <div
                  className={`absolute top-0 left-0 w-1/5 h-full ${
                    degree <= 1 && "rounded-r-full"
                  }`}
                  style={{
                    backgroundColor: `var(--${STRUCTURE_DEGREE_ARRAY[0]}`,
                  }}
                />
              )}
              {degree >= 2 && (
                <div
                  className={`absolute top-0 left-1/5 w-1/5 h-full ${
                    degree <= 2 && "rounded-r-full"
                  }`}
                  style={{
                    backgroundColor: `var(--${STRUCTURE_DEGREE_ARRAY[1]}`,
                  }}
                />
              )}
              {degree >= 3 && (
                <div
                  className={`absolute top-0 left-2/5 w-1/5 h-full ${
                    degree <= 3 && "rounded-r-full"
                  }`}
                  style={{
                    backgroundColor: `var(--${STRUCTURE_DEGREE_ARRAY[2]}`,
                  }}
                />
              )}
              {degree >= 4 && (
                <div
                  className={`absolute top-0 left-3/5 w-1/5 h-full ${
                    degree <= 4 && "rounded-r-full"
                  }`}
                  style={{
                    backgroundColor: `var(--${STRUCTURE_DEGREE_ARRAY[3]}`,
                  }}
                />
              )}
              {degree >= 5 && (
                <div
                  className={`absolute top-0 left-4/5 w-1/5 h-full ${
                    degree <= 5 && "rounded-r-full"
                  }`}
                  style={{
                    backgroundColor: `var(--${STRUCTURE_DEGREE_ARRAY[4]}`,
                  }}
                />
              )}
            </>
          )}
        </div>
        <div className="flex justify-between mt-5 text-12">
          <p>{STRUCTURE_LOOKUP[label].level.low}</p>
          <p>{STRUCTURE_LOOKUP[label].level.high}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailViewDegree;
