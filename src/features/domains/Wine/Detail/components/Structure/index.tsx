// Structure/index.tsx
// 와인 구조를 나타내는 컴포넌트
// 차트뷰와 디테일뷰로 분리하여 UI 표시
import { StructureInfo } from "@/models/Wine";
import { ChartView, DetailView } from "./View";

interface StructureProps {
  structure: StructureInfo;
}

const Structure = ({ structure }: StructureProps) => {
  return (
    <div className="px-20 mx-auto mt-20 md:px-40 md:max-w-1000 max-w-500">
      <p className="text-32 md:text-40 text-(--main) text-center font-display pt-40 pb-20">
        와인 구조
      </p>
      {structure ? (
        <div className="flex flex-col justify-center gap-20 md:flex-row">
          <div className="flex items-center justify-center w-full bg-white min-h-200 rounded-15">
            <ChartView structure={structure} />
          </div>
          <div className="flex items-center justify-center w-full bg-white min-h-200 rounded-15">
            <DetailView structure={structure} />
          </div>
        </div>
      ) : (
        <div className="text-center bg-white rounded-15 py-70">
          <p className="mt-15">와인 구조를 불러오는 데 오류가 발생했습니다.</p>
          <button
            onClick={() => window.location.reload()}
            className="text-12 bg-(--light-main) py-12 px-20 rounded-full mt-20 cursor-pointer"
          >
            페이지 새로고침
          </button>
        </div>
      )}
    </div>
  );
};

export default Structure;
