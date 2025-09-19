// WineItem.tsx
// 와인 리스트를 박스 형태로 보여주는 컴포넌트
// 각 박스를 클릭하면 해당 와인의 상세 페이지로 이동
import { Link } from "react-router-dom";
import { TypeBadge } from "@/components";
import { WineWithWinery } from "@/models/Wine";
import { Filter } from "@/models/Filter";
import { TYPE_LOOKUP } from "@/constants/Wine";
import { COUNTRY_LOOKUP } from "@/constants/Country";

interface WineItemProps {
  // 보여줄 와인
  wine: WineWithWinery;
  // 필터 객체
  filter: Filter;
}

const WineItem = ({ wine, filter }: WineItemProps) => {
  // 보여줄 와인 타입
  const nowType = TYPE_LOOKUP[wine.type] ?? TYPE_LOOKUP["etc"];
  // 보여줄 와인 국가
  const nowCountry = COUNTRY_LOOKUP[wine.country] ?? COUNTRY_LOOKUP["etc"];

  return (
    <div className="max-w-700 w-full lg:w-[calc((100%/2)-20px)] bg-white rounded-15 h-200 hover:cursor-pointer hover:scale-102 duration-300">
      <Link to={`/wine/${wine.id}`} state={{ filter: filter }}>
        <div className="flex w-full h-full p-20">
          {/* 와인 이미지 영역 */}
          <div className="w-[30%] h-full">
            <img
              src={wine.image ? wine.image : undefined}
              className={`object-cover h-full`}
            />
          </div>
          {/* 와인 정보 영역 */}
          <div className="w-[70%] break-keep shrink-0 px-10 flex flex-col gap-5">
            <TypeBadge
              type={nowType.type}
              label={nowType.name}
              variant="small"
            />
            <div>
              <span className="text-14">{nowCountry.emoji}</span>
              <span className="ml-5 text-14">
                {nowCountry.en}
                {wine.region ? " > " + wine.region : null}
              </span>
            </div>
            <p className="line-clamp-2 text-16 leading-[120%] font-light">
              {wine.ename}
            </p>
            <p className="line-clamp-2 text-14 leading-[120%]">{wine.kname}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default WineItem;
