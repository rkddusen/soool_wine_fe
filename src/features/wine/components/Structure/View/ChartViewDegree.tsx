// Structure/View/ChartViewDegree.tsx
// 와인 구조의 차트뷰 부분
import { STRUCTURE_DEGREE_ARRAY } from "@/constants/Wine";
import { StructureKey } from "@/models/Wine";

interface ChartViewDegreeProps {
  degree: number | null;
  label: StructureKey;
}

const ChartViewDegree = ({ degree, label }: ChartViewDegreeProps) => {
  const ROTATE = {
    sweetness: "rotate-0",
    acidity: "rotate-90",
    body: "-rotate-90",
    tannin: "rotate-180",
  };
  return (
    <>
      <div
        className={`shrink-0 relative overflow-hidden w-55 h-55 md:w-75 md:h-75 ${ROTATE[label]}`}
      >
        <div
          className={`absolute rounded-full bg-(--gray-f5) w-110 h-110 -right-55 -bottom-55 md:w-150 md:h-150 md:-right-75 md:-bottom-75 `}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div
            className={`
              absolute rounded-full ${
                degree && degree >= 5 ? "block" : "hidden"
              }
              w-110 h-110 -right-55 -bottom-55
              md:w-150 md:h-150 md:-right-75 md:-bottom-75
            `}
            style={{ backgroundColor: `var(--${STRUCTURE_DEGREE_ARRAY[4]}` }}
          ></div>
          <div
            className={`
              absolute rounded-full ${
                degree && degree >= 4 ? "block" : "hidden"
              }
              w-90 h-90 -right-45 -bottom-45
              md:w-120 md:h-120 md:-right-60 md:-bottom-60
            `}
            style={{ backgroundColor: `var(--${STRUCTURE_DEGREE_ARRAY[3]}` }}
          ></div>
          <div
            className={`
              absolute rounded-full ${
                degree && degree >= 3 ? "block" : "hidden"
              }
              w-70 h-70 -right-35 -bottom-35
              md:w-90 md:h-90 md:-right-45 md:-bottom-45
            `}
            style={{ backgroundColor: `var(--${STRUCTURE_DEGREE_ARRAY[2]}` }}
          ></div>
          <div
            className={`
              absolute rounded-full ${
                degree && degree >= 2 ? "block" : "hidden"
              }
              w-50 h-50 -right-25 -bottom-25
              md:w-60 md:h-60 md:-right-30 md:-bottom-30
            `}
            style={{ backgroundColor: `var(--${STRUCTURE_DEGREE_ARRAY[1]}` }}
          ></div>
          <div
            className={`
              absolute rounded-full ${
                degree && degree >= 1 ? "block" : "hidden"
              }
              w-30 h-30 -right-15 -bottom-15
              md:w-30 md:h-30 md:-right-15 md:-bottom-15
            `}
            style={{ backgroundColor: `var(--${STRUCTURE_DEGREE_ARRAY[0]}` }}
          ></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full border-(--gray-f5) border-r-1 border-b-1"></div>
      </div>
    </>
  );
};

export default ChartViewDegree;
