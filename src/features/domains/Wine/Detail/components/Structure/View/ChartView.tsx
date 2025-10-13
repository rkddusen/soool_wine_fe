// Structure/View/ChartView.tsx
// 와인 구조의 차트뷰
import { StructureInfo } from "@/models/Wine";
import ChartViewDegree from "./ChartViewDegree";

interface ChartViewProps {
  structure: StructureInfo;
}

const ChartView = ({ structure }: ChartViewProps) => {
  return (
    <div className="grid grid-cols-[min-content_min-content_min-content] justify-center gap-2">
      {/* 그리드 형태의 UI 
        당도 __ __ 산도
        __   @ @   __
        __   @ @   __
        바디 __ __ 타닌 
      */}
      {/* 당도 __ __ 산도 */}
      <div className="text-right">
        <span className="text-nowrap text-14 md:text-16">당도</span>
      </div>
      <div />
      <div>
        <span className="text-nowrap text-14 md:text-16">산도</span>
      </div>
      {/* __   @ @   __ */}
      <div />
      <div className="flex gap-2">
        <ChartViewDegree degree={structure.sweetness} label="sweetness" />
        <ChartViewDegree degree={structure.acidity} label="acidity" />
      </div>
      <div />
      {/* __   @ @   __ */}
      <div />
      <div className="flex gap-2">
        <ChartViewDegree degree={structure.body} label="body" />
        <ChartViewDegree degree={structure.tannin} label="tannin" />
      </div>
      <div />
      {/* 바디 __ __ 타닌 */}
      <div className="text-right">
        <span className="text-nowrap text-14 md:text-16">바디</span>
      </div>
      <div />
      <div>
        <span className="text-nowrap text-14 md:text-16">타닌</span>
      </div>
    </div>
  );
};

export default ChartView;
