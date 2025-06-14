import { WineStructure, WineStructureKey } from "@/models/Wine";
import { WINESTRUCTURE, WINESTRUCTUREDEGREE } from "@/data/Wine";

interface StructureProps {
  structure: WineStructure;
}

const WineStructureSection = ({ structure }: StructureProps) => {
  return (
    <div className="flex flex-col justify-center gap-20 px-20 mx-auto mt-20 md:flex-row md:px-40 md:max-w-1000 max-w-500">
      <div className="flex items-center justify-center w-full bg-white rounded-15">
        <ChartView structure={structure} />
      </div>
      <div className="flex items-center justify-center w-full bg-white rounded-15">
        <DetailView structure={structure} />
      </div>
    </div>
  );
};

export default WineStructureSection;

const ChartView = ({ structure }: StructureProps) => {
  return (
    <div className="p-40 grid grid-cols-[min-content_min-content_min-content] justify-center gap-y-2">
      <div className="text-right">
        <span className="text-nowrap text-14 sm:text-16">당도</span>
      </div>
      <div />
      <div>
        <span className="text-nowrap text-14 sm:text-16">산도</span>
      </div>

      <div />
      <div className="flex">
        <ChartViewDegree degree={structure.sweetness} label="sweetness" />
        <ChartViewDegree degree={structure.acidity} label="acidity" />
      </div>
      <div />

      <div />
      <div className="flex">
        <ChartViewDegree degree={structure.body} label="body" />
        <ChartViewDegree degree={structure.tannin} label="tannin" />
      </div>
      <div />

      <div className="text-right">
        <span className="text-nowrap text-14 sm:text-16">바디</span>
      </div>
      <div />
      <div>
        <span className="text-nowrap text-14 sm:text-16">타닌</span>
      </div>
    </div>
  );
};
interface ChartViewDegreeProps {
  degree: number | null;
  label: WineStructureKey;
}
const ChartViewDegree = ({ degree, label }: ChartViewDegreeProps) => {
  return (
    <>
      <div
        className={`shrink-0 relative overflow-hidden w-55 h-55 sm:w-75 sm:h-75 ${WINESTRUCTURE[label].rotation}`}
      >
        <div
          className={`absolute rounded-full bg-(--gray-f5) w-110 h-110 -right-55 -bottom-55 sm:w-150 sm:h-150 sm:-right-75 sm:-bottom-75 `}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div
            className={`
              absolute rounded-full ${WINESTRUCTUREDEGREE[4]} ${
              degree && degree >= 5 ? "block" : "hidden"
            }
              w-110 h-110 -right-55 -bottom-55
              sm:w-150 sm:h-150 sm:-right-75 sm:-bottom-75
            `}
          ></div>
          <div
            className={`
              absolute rounded-full ${WINESTRUCTUREDEGREE[3]} ${
              degree && degree >= 4 ? "block" : "hidden"
            }
              w-90 h-90 -right-45 -bottom-45
              sm:w-120 sm:h-120 sm:-right-60 sm:-bottom-60
            `}
          ></div>
          <div
            className={`
              absolute rounded-full ${WINESTRUCTUREDEGREE[2]} ${
              degree && degree >= 3 ? "block" : "hidden"
            }
              w-70 h-70 -right-35 -bottom-35
              sm:w-90 sm:h-90 sm:-right-45 sm:-bottom-45
            `}
          ></div>
          <div
            className={`
              absolute rounded-full ${WINESTRUCTUREDEGREE[1]} ${
              degree && degree >= 2 ? "block" : "hidden"
            }
              w-50 h-50 -right-25 -bottom-25
              sm:w-60 sm:h-60 sm:-right-30 sm:-bottom-30
            `}
          ></div>
          <div
            className={`
              absolute rounded-full ${WINESTRUCTUREDEGREE[0]} ${
              degree && degree >= 1 ? "block" : "hidden"
            }
              w-30 h-30 -right-15 -bottom-15
              sm:w-30 sm:h-30 sm:-right-15 sm:-bottom-15
            `}
          ></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full border-(--gray-f5) border-r-1 border-b-1"></div>
      </div>
    </>
  );
};

const DetailView = ({ structure }: StructureProps) => {
  return <></>;
};
