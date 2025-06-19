import { WineStructure, WineStructureKey } from "@/models/Wine";
import { WINESTRUCTURE, WINESTRUCTUREDEGREE } from "@/data/Wine";

interface StructureProps {
  structure: WineStructure;
}

const WineStructureSection = ({ structure }: StructureProps) => {
  return (
    <div className="px-20 mx-auto mt-20 md:px-40 md:max-w-1000 max-w-500">
      <p className="text-48 md:text-54 text-(--main) text-center font-display pt-40 pb-20">
        와인 구조
      </p>
      <div className="flex flex-col justify-center gap-20 md:flex-row">
        <div className="flex items-center justify-center w-full bg-white min-h-200 rounded-15">
          {structure ? (
            <ChartView structure={structure} />
          ) : (
            // <p>와인 정보를 불러오는 데 오류가 발생했습니다.</p>
            <ChartView
              structure={{ sweetness: 5, acidity: 4, body: null, tannin: 2 }}
            />
          )}
        </div>
        <div className="flex items-center justify-center w-full bg-white min-h-200 rounded-15">
          {structure ? (
            <DetailView structure={structure} />
          ) : (
            // <p>와인 정보를 불러오는 데 오류가 발생했습니다.</p>
            <DetailView
              structure={{ sweetness: 5, acidity: 4, body: null, tannin: 2 }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WineStructureSection;

const ChartView = ({ structure }: StructureProps) => {
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
interface StructureDegreeProps {
  degree: number | null;
  label: WineStructureKey;
}
const ChartViewDegree = ({ degree, label }: StructureDegreeProps) => {
  return (
    <>
      <div
        className={`shrink-0 relative overflow-hidden w-55 h-55 md:w-75 md:h-75 ${WINESTRUCTURE[label].rotation}`}
      >
        <div
          className={`absolute rounded-full bg-(--gray-f5) w-110 h-110 -right-55 -bottom-55 md:w-150 md:h-150 md:-right-75 md:-bottom-75 `}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div
            className={`
              absolute rounded-full ${WINESTRUCTUREDEGREE[4]} ${
              degree && degree >= 5 ? "block" : "hidden"
            }
              w-110 h-110 -right-55 -bottom-55
              md:w-150 md:h-150 md:-right-75 md:-bottom-75
            `}
          ></div>
          <div
            className={`
              absolute rounded-full ${WINESTRUCTUREDEGREE[3]} ${
              degree && degree >= 4 ? "block" : "hidden"
            }
              w-90 h-90 -right-45 -bottom-45
              md:w-120 md:h-120 md:-right-60 md:-bottom-60
            `}
          ></div>
          <div
            className={`
              absolute rounded-full ${WINESTRUCTUREDEGREE[2]} ${
              degree && degree >= 3 ? "block" : "hidden"
            }
              w-70 h-70 -right-35 -bottom-35
              md:w-90 md:h-90 md:-right-45 md:-bottom-45
            `}
          ></div>
          <div
            className={`
              absolute rounded-full ${WINESTRUCTUREDEGREE[1]} ${
              degree && degree >= 2 ? "block" : "hidden"
            }
              w-50 h-50 -right-25 -bottom-25
              md:w-60 md:h-60 md:-right-30 md:-bottom-30
            `}
          ></div>
          <div
            className={`
              absolute rounded-full ${WINESTRUCTUREDEGREE[0]} ${
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

const DetailView = ({ structure }: StructureProps) => {
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

const DetailViewDegree = ({ degree, label }: StructureDegreeProps) => {
  return (
    <div>
      <p className="text-center">{WINESTRUCTURE[label].title}</p>
      <div className="mt-5">
        <div className="relative w-full h-12 bg-(--gray-f0) rounded-full overflow-hidden">
          {degree && (
            <>
              {degree >= 1 && (
                <div
                  className={`absolute top-0 left-0 w-1/5 h-full ${
                    WINESTRUCTUREDEGREE[0]
                  } ${degree <= 1 && "rounded-r-full"}`}
                />
              )}
              {degree >= 2 && (
                <div
                  className={`absolute top-0 left-1/5 w-1/5 h-full ${
                    WINESTRUCTUREDEGREE[1]
                  } ${degree <= 2 && "rounded-r-full"}`}
                />
              )}
              {degree >= 3 && (
                <div
                  className={`absolute top-0 left-2/5 w-1/5 h-full ${
                    WINESTRUCTUREDEGREE[2]
                  } ${degree <= 3 && "rounded-r-full"}`}
                />
              )}
              {degree >= 4 && (
                <div
                  className={`absolute top-0 left-3/5 w-1/5 h-full ${
                    WINESTRUCTUREDEGREE[3]
                  } ${degree <= 4 && "rounded-r-full"}`}
                />
              )}
              {degree >= 5 && (
                <div
                  className={`absolute top-0 left-4/5 w-1/5 h-full ${
                    WINESTRUCTUREDEGREE[4]
                  } ${degree <= 5 && "rounded-r-full"}`}
                />
              )}
            </>
          )}
        </div>
        <div className="flex justify-between mt-5 text-12">
          <p>{WINESTRUCTURE[label].level.low}</p>
          <p>{WINESTRUCTURE[label].level.high}</p>
        </div>
      </div>
    </div>
  );
};
