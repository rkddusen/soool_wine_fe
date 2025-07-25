// Relation/list/RelationItem.tsx
// 관련 와인 리스트를 이루는 아이템 컴포넌트
import { WineWithWinery } from "@/models/Wine";
import { COUNTRY_LOOKUP } from "@/constants/Country";
import { TYPE_LOOKUP } from "@/constants/Wine";
import { Link } from "react-router-dom";

interface RelationItemProps {
  wine: WineWithWinery;
}
const RelationItem = ({ wine }: RelationItemProps) => {
  const country = COUNTRY_LOOKUP[wine.country];
  const type = TYPE_LOOKUP[wine.type];
  return (
    <Link to={`/wine/${wine.id}`}>
      <div className="relative w-full h-full p-15 rounded-10 bg-white">
        <div className="absolute top-10 left-10">
          <span
            className={`type-box text-12`}
            style={{ backgroundColor: `var(--${type.type}-wine)` }}
          >
            {type.name}
          </span>
        </div>
        <img src={wine.image || undefined} className="w-full" />
        <div className="mt-5 text-12 flex gap-5">
          <span>{country.emoji}</span>
          <span>{country.en}</span>
        </div>
        <p className="line-clamp-2 text-14 leading-[18px] mt-5 font-light">
          {wine.ename}
        </p>
        <p className="line-clamp-2 text-12 leading-[16px] mt-5">{wine.kname}</p>
      </div>
    </Link>
  );
};

export default RelationItem;
