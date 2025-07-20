// MainCity/MainCity.tsx
// 주요 와인 생산 지역을 카드 형태로 보여주는 컴포넌트
import { useRef } from "react";
import { CITY } from "@/constants/City";
import { Card } from "./card";
import HorizontalMoveBtn from "@/components/HorizontalMoveBtn";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

// 카드 하나의 가로 길이 (320px) + 카드 간 gap (30px) = 350px
const SCROLL_UNIT = 350;

const MainCity = () => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const { isScrollBtnActive, scrollMove } = useHorizontalScroll(
    scrollRef,
    SCROLL_UNIT
  );

  return (
    <section className="w-full pt-70">
      <p className="px-20 mx-auto text-20 md:text-24 md:px-40 max-w-1280">
        주요 와인 생산 지역
      </p>
      {/* 카드 리스트 영역 */}
      <div className="mt-20 mb-40 overflow-hidden select-none">
        <ul
          ref={scrollRef}
          className="flex overflow-x-scroll gap-30 scrollbar-hide md:px-[max(40px,_calc((100vw-1220px)/2))] px-20"
        >
          {CITY.map((c) => (
            <Card key={c.city} city={c} />
          ))}
        </ul>
      </div>
      {/* 가로 스크롤 이동 버튼 영역 */}
      <div className="flex justify-end px-20 mx-auto gap-15 md:px-40 max-w-1280">
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
    </section>
  );
};

export default MainCity;
