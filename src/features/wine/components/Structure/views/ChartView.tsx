// Structure/views/ChartView.tsx
// 와인 구조의 차트뷰
import { StructureInfo } from "@/models/Wine";
import ChartViewDegree from "./ChartViewDegree";

interface Props {
  structure: StructureInfo;
}

const ChartView = ({ structure }: Props) => {
  return (
    <div className="grid grid-cols-[min-content_min-content_min-content] justify-center gap-2">
      <div className="text-right">
        <span className="text-nowrap text-14 md:text-16">당도</span>
      </div>
      <div />
      <div>
        <span className="text-nowrap text-14 md:text-16">산도</span>
      </div>

      <div />
      <div className="flex gap-2">
        <ChartViewDegree
          degree={structure.sweetness ?? null}
          label="sweetness"
        />
        <ChartViewDegree degree={structure.acidity ?? null} label="acidity" />
      </div>
      <div />

      <div />
      <div className="flex gap-2">
        <ChartViewDegree degree={structure.body ?? null} label="body" />
        <ChartViewDegree degree={structure.tannin ?? null} label="tannin" />
      </div>
      <div />

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
