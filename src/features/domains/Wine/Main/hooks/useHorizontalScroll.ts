/**
 * Main/hooks/useHorizontalScroll.ts
 * 주요 와인 생산 지역을 가로로 스크롤하는 커스텀 훅
 * 좌/우 버튼의 활성화 여부와 이동하는 함수 반환
 */
import { useEffect, useState } from "react";

export const useHorizontalScroll = (
  scrollRef: React.RefObject<HTMLElement>,
  unit: number
) => {
  // 각 방향(왼쪽, 오른쪽) 스크롤 버튼의 활성화 상태를 나타냄
  const [isScrollBtnActive, setIsScrollBtnActive] = useState({
    left: false,
    right: false,
  });

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

  // 스크롤을 지정 방향으로 350px 단위로 이동
  const scrollMove = (direction: "left" | "right"): void => {
    if (!scrollRef.current) return;
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

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScrollPosition();
    el.addEventListener("scroll", checkScrollPosition);

    return () => {
      el.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  return { isScrollBtnActive, scrollMove };
};
