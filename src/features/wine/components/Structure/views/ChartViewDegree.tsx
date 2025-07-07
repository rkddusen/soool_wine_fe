// Structure/views/ChartViewDegree.tsx
// 와인 구조의 차트뷰 부분
import { STRUCTURE_DEGREE_ARRAY, STRUCTURE_LOOKUP } from "@/constants/Wine";
import { StructureKey } from "@/models/Wine";

interface Props {
  degree: number | null;
  label: StructureKey;
}

const ChartViewDegree = ({ degree, label }: Props) => {
  return (
    <>
      <div
        className={`shrink-0 relative overflow-hidden w-55 h-55 md:w-75 md:h-75 ${STRUCTURE_LOOKUP[label].rotation}`}
      >
        <div
          className={`absolute rounded-full bg-(--gray-f5) w-110 h-110 -right-55 -bottom-55 md:w-150 md:h-150 md:-right-75 md:-bottom-75 `}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div
            className={`
              absolute rounded-full ${STRUCTURE_DEGREE_ARRAY[4]} ${
              degree && degree >= 5 ? "block" : "hidden"
            }
              w-110 h-110 -right-55 -bottom-55
              md:w-150 md:h-150 md:-right-75 md:-bottom-75
            `}
          ></div>
          <div
            className={`
              absolute rounded-full ${STRUCTURE_DEGREE_ARRAY[3]} ${
              degree && degree >= 4 ? "block" : "hidden"
            }
              w-90 h-90 -right-45 -bottom-45
              md:w-120 md:h-120 md:-right-60 md:-bottom-60
            `}
          ></div>
          <div
            className={`
              absolute rounded-full ${STRUCTURE_DEGREE_ARRAY[2]} ${
              degree && degree >= 3 ? "block" : "hidden"
            }
              w-70 h-70 -right-35 -bottom-35
              md:w-90 md:h-90 md:-right-45 md:-bottom-45
            `}
          ></div>
          <div
            className={`
              absolute rounded-full ${STRUCTURE_DEGREE_ARRAY[1]} ${
              degree && degree >= 2 ? "block" : "hidden"
            }
              w-50 h-50 -right-25 -bottom-25
              md:w-60 md:h-60 md:-right-30 md:-bottom-30
            `}
          ></div>
          <div
            className={`
              absolute rounded-full ${STRUCTURE_DEGREE_ARRAY[0]} ${
              degree && degree >= 1 ? "block" : "hidden"
            }
              w-30 h-30 -right-15 -bottom-15
              md:w-30 md:h-30 md:-right-15 md:-bottom-15
            `}
          ></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full border-(--gray-f5) border-r-1 border-b-1"></div>
      </div>
    </>
  );
};

export default ChartViewDegree;
