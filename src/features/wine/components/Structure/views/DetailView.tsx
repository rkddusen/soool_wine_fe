// Structure/views/DetailView.tsx
// 와인 구조의 디테일뷰
import { StructureInfo } from "@/models/Wine";
import DetailViewDegree from "./DetailViewDegree";

interface Props {
  structure: StructureInfo;
}

const DetailView = ({ structure }: Props) => {
  return (
    <div className="py-40 px-20 flex flex-col justify-center w-[80%] gap-20">
      <DetailViewDegree
        degree={structure.sweetness ?? null}
        label="sweetness"
      />
      <DetailViewDegree degree={structure.acidity ?? null} label="acidity" />
      <DetailViewDegree degree={structure.body ?? null} label="body" />
      <DetailViewDegree degree={structure.tannin ?? null} label="tannin" />
    </div>
  );
};

export default DetailView;
