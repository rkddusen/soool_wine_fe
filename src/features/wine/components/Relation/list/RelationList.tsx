// Relation/list/RelationList.tsx
// 관련 와인 리스트 컴포넌트
// 가로 스크롤로 리스트 구성
import { useRef } from "react";
import { TypeKey, WineWithWinery } from "@/models/Wine";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import HorizontalMoveBtn from "@/components/HorizontalMoveBtn";
import RelationItem from "./RelationItem";
import { COUNTRY_LOOKUP } from "@/constants/Country";
import { TYPE_LOOKUP } from "@/constants/Wine";

interface RelationListProps {
  title: "type" | "country";
  standard: (TypeKey | string)[];
  items: WineWithWinery[];
}

const SCROLL_UNIT = 220;

const RelationList = ({ title, standard, items }: RelationListProps) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const { isScrollBtnActive, scrollMove } = useHorizontalScroll(
    scrollRef,
    SCROLL_UNIT
  );

  const getListTitle = (
    title: "type" | "country",
    standard: (TypeKey | string)[]
  ) => {
    // 관련 와인 리스트가 type이라면 type에 맞게 UI 설정
    if (title === "type") {
      return (
        <span className="my-10 flex gap-5 flex-wrap">
          {standard.map((s) => (
            <span
              key={s}
              className="text-16 rounded-5 text-white px-8 py-6 shrink-0"
              style={{ backgroundColor: `var(--${s}-wine)` }}
            >
              {TYPE_LOOKUP[s as TypeKey].shortName}
            </span>
          ))}
        </span>
      );
    }

    // 관련 와인 리스트가 country라면 country에 맞게 UI 설정
    return (
      <span className="my-10 flex gap-5 flex-wrap">
        {standard.map((s) => (
          <span
            key={s}
            className="text-14 rounded-5 bg-white px-8 py-6 shrink-0"
          >
            {COUNTRY_LOOKUP[s].emoji} {COUNTRY_LOOKUP[s].kr}
          </span>
        ))}
      </span>
    );
  };
  return (
    <div className="pt-40">
      <div className="text-20 px-20 mx-auto md:px-40 md:max-w-1000 max-w-500">
        <p>더 많은</p>
        {getListTitle(title, standard)}
        <p>와인을 확인해보세요!</p>
      </div>
      <div>
        <ul
          ref={scrollRef}
          className="flex gap-20 my-20 w-full overflow-x-scroll scrollbar-hide h-300 md:px-[max(40px,_calc((100vw-940px)/2))] px-[max(20px,_calc((100vw-480px)/2))]"
        >
          {items.map((v) => (
            <li key={v.id} className="w-200 shrink-0">
              <RelationItem wine={v} />
            </li>
          ))}
        </ul>
      </div>
      {/* 수평 이동 버튼 */}
      <div className="flex justify-end mx-auto gap-15 w-full px-20 md:px-40 md:max-w-1000 max-w-500">
        <HorizontalMoveBtn
          onClick={() => scrollMove("left")}
          isActive={isScrollBtnActive.left}
          direction="left"
        />
        <HorizontalMoveBtn
          onClick={() => scrollMove("right")}
          isActive={isScrollBtnActive.right}
          direction="right"
        />
      </div>
    </div>
  );
};

export default RelationList;
