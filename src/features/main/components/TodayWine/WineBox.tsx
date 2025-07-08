// TodayWine/WineBox.tsx
// 오늘의 와인에서 와인 정보를 담은 박스 컴포넌트
// 각 와인을 클릭 시 해당 와인 페이지(/wine/...)로 이동
import { Link } from "react-router-dom";
import { TypeKey, WineWithWinery } from "@/models/Wine";
import { COUNTRY_LOOKUP } from "@/constants/Country";
import Structure from "./Structure";
import { TYPE_LOOKUP } from "@/constants/Wine";

interface WineBoxProps {
  // 와인 타입 (ex. red)
  type: TypeKey;
  // 와인 객체
  wine?: WineWithWinery;
}

const WineBox = ({ type, wine }: WineBoxProps) => {
  // COUNTRY_LOOKUP에서 국가 코드에 해당하는 데이터 조회
  // 없으면 'etc'(기타)
  const countryInfo =
    wine && (COUNTRY_LOOKUP[wine.country] ?? COUNTRY_LOOKUP.etc);

  return (
    <Link to={wine ? `/wine/${wine.id}` : ""}>
      <div className="flex flex-col w-full p-10 overflow-hidden bg-white rounded-15 h-320 group">
        {/* 와인 타입 영역 */}
        <div
          className={`shrink-0 w-[45%] max-w-200 h-50 flex flex-row justify-center items-center rounded-15 text-white`}
          style={{ backgroundColor: `var(--${type}-wine)` }}
        >
          <span className="text-center text-14 sm:text-16">
            {TYPE_LOOKUP[type].label}
          </span>
        </div>
        {/* 와인 정보 영역 */}
        <div className="relative flex items-center justify-center w-full h-full p-10">
          {wine ? (
            <>
              <div className="pr-[30%] h-full break-keep z-10">
                <div className="line-clamp-1 leading-[120%]">
                  <span className="text-12 sm:text-14">
                    {countryInfo ? countryInfo.emoji : null}
                  </span>
                  <span className="ml-5 text-12 sm:text-14">{wine.region}</span>
                </div>
                <div className="mt-5">
                  <p className="break-words text-14 sm:text-16 line-clamp-2 leading-[120%]">
                    {wine.ename}
                  </p>
                  <p className="mt-5 text-12 sm:text-14 text-(--gray-78) line-clamp-2 leading-[120%]">
                    {wine.kname}
                  </p>
                </div>
                {/* 와인 구조 영역 */}
                <div className="flex flex-col gap-10 mt-20">
                  <Structure
                    structure="sweetness"
                    degree={wine.structure.sweetness}
                  />
                  <Structure
                    structure="acidity"
                    degree={wine.structure.acidity}
                  />
                  <Structure structure="body" degree={wine.structure.body} />
                  <Structure
                    structure="tannin"
                    degree={wine.structure.tannin}
                  />
                </div>
              </div>
              <div className="absolute w-[30%] right-0 h-[calc(100%+50px)] bottom-0">
                <img
                  src={wine.image ? wine.image : undefined}
                  className="object-cover max-w-none absolute center-absolute group-hover:h-[85%] h-[75%] duration-300"
                />
              </div>
            </>
          ) : (
            <p>와인을 불러오는 데에 문제가 발생했습니다.</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default WineBox;
