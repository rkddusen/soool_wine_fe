// Structure/View/DetailView.tsx
// 와인 구조의 디테일뷰
import { StructureInfo } from "@/models/Wine";
import DetailViewDegree from "./DetailViewDegree";

interface DetailViewProps {
  structure: StructureInfo;
}

const DetailView = ({ structure }: DetailViewProps) => {
  return (
    <div className="py-40 px-20 flex flex-col justify-center w-[80%] gap-20">
      <DetailViewDegree degree={structure.sweetness} label="sweetness" />
      <DetailViewDegree degree={structure.acidity} label="acidity" />
      <DetailViewDegree degree={structure.body} label="body" />
      <DetailViewDegree degree={structure.tannin} label="tannin" />
    </div>
  );
};

export default DetailView;
