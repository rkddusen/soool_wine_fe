// MainCity/MainCity.tsx
// 주요 와인 생산 지역을 카드 형태로 보여주는 컴포넌트
import { useEffect, useRef, useState } from "react";
import { CITY } from "@/constants/City";
import { Card } from "./card";
import MoveBtn from "./MoveBtn";

const MainCity = () => {
  // 각 방향(왼쪽, 오른쪽) 스크롤 버튼의 활성화 상태를 나타냄
  const [isScrollBtnActive, setIsScrollBtnActive] = useState({
    left: false,
    right: true,
  });
  const scrollRef = useRef<HTMLUListElement>(null);

  // 스크롤 위치에 따라 이동 버튼 활성화 상태를 업데이트
  const checkScrollPosition = (): void => {
    if (!scrollRef.current) return;

    const el = scrollRef.current;
    const left = el.scrollLeft;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    setIsScrollBtnActive({
      left: left > 0,
      right: left < maxScrollLeft,
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScrollPosition();
    el.addEventListener("scroll", checkScrollPosition);

    return () => {
      el.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  // 스크롤을 지정 방향으로 350px 단위로 이동
  const scrollMove = (direction: "left" | "right"): void => {
    if (!scrollRef.current) return;
    // 카드 하나의 가로 길이 (320px) + 카드 간 gap (30px) = 350px
    const unit = 350;
    let afterMoving =
      scrollRef.current.scrollLeft + (direction === "right" ? unit : -unit);
    if (afterMoving % unit) {
      // 스크롤 위치를 카드 단위(350px)에 딱 맞춰서 이동
      afterMoving =
        direction === "right"
          ? afterMoving - (afterMoving % unit)
          : afterMoving + (unit - (afterMoving % unit));
    }
    scrollRef.current.scrollTo({ left: afterMoving, behavior: "smooth" });
  };

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
        <MoveBtn
          onClick={() => scrollMove("left")}
          isActive={isScrollBtnActive.left}
          direction="left"
        />
        <MoveBtn
          onClick={() => scrollMove("right")}
          isActive={isScrollBtnActive.right}
          direction="right"
        />
      </div>
    </section>
  );
};

export default MainCity;
