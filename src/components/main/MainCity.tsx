import { ReactNode, useEffect, useRef, useState } from "react";
import { CITY } from "@/data/City";
import SideFlipCard from "../common/SideFlipCard";
import { COUNTRY_LOOKUP } from "@/data/Country";
import {
  ArrowRightIcon,
  ArrowsRightLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const MainCity = () => {
  const [detailMap, setDetailMap] = useState<Record<string, boolean>>(
    Object.fromEntries(CITY.map((c) => [c.city, false]))
  );
  const [isScrollBtnActive, setIsScrollBtnActive] = useState({
    left: false,
    right: true,
  });
  const scrollRef = useRef<HTMLUListElement>(null);

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

  const handleDetail = (key: string): void => {
    setDetailMap((prev) => ({
      ...prev,
      [key]: !detailMap[key],
    }));
  };

  const scrollMove = (direction: "left" | "right"): void => {
    if (!scrollRef.current) return;
    const unit = 350;
    let afterMoving =
      scrollRef.current.scrollLeft + (direction === "right" ? unit : -unit);
    if (afterMoving % unit) {
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
      <div className="mt-20 mb-40 overflow-hidden select-none">
        <ul
          ref={scrollRef}
          className="flex overflow-x-scroll gap-30 scrollbar-hide md:px-[max(40px,_calc((100vw-1220px)/2))] px-20"
        >
          {CITY.map((c) => (
            <li
              key={c.city}
              className="overflow-hidden bg-white w-320 shrink-0 h-500 rounded-20"
            >
              <SideFlipCard
                flipped={detailMap[c.city]}
                front={
                  <div className="flex flex-col justify-between w-full h-full p-20">
                    <CountryArea country={c.country} />
                    <div>
                      <p className="tracking-wider text-center text-24">
                        {c.city}
                      </p>
                      <p className="mt-10 text-center">{c.kname}</p>
                      <img
                        className="object-cover w-full my-20 h-200 rounded-20"
                        src={c.img}
                        alt={c.city}
                      />
                    </div>
                    <BtnArea handleOpenDetail={() => handleDetail(c.city)} />
                  </div>
                }
                back={
                  <div className="flex flex-col justify-between w-full h-full p-20">
                    <CountryArea country={c.country} />
                    <div>
                      <p className="leading-32">{c.description}</p>
                    </div>
                    <BtnArea handleOpenDetail={() => handleDetail(c.city)} />
                  </div>
                }
              ></SideFlipCard>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end px-20 mx-auto gap-15 md:px-40 max-w-1280">
        <MoveBtn
          handleClickEvent={() => scrollMove("left")}
          isActive={isScrollBtnActive.left}
        >
          <ChevronLeftIcon
            className={`w-20 h-20 ${
              isScrollBtnActive.left ? "stroke-black" : "stroke-(--gray-c0)"
            }`}
          />
        </MoveBtn>
        <MoveBtn
          handleClickEvent={() => scrollMove("right")}
          isActive={isScrollBtnActive.right}
        >
          <ChevronRightIcon
            className={`w-20 h-20 ${
              isScrollBtnActive.right ? "stroke-black" : "stroke-(--gray-c0)"
            }`}
          />
        </MoveBtn>
      </div>
    </section>
  );
};

interface CountryAreaProps {
  country: string;
}
const CountryArea = ({ country }: CountryAreaProps) => {
  const nowCountry = COUNTRY_LOOKUP[country] ?? COUNTRY_LOOKUP["etc"];
  return (
    <div className="flex items-center gap-5">
      <p className="text-32">{nowCountry.emoji}</p>
      <p className="text-16">{nowCountry.en}</p>
    </div>
  );
};

interface BtnAreaProps {
  handleOpenDetail(): void;
}
const BtnArea = ({ handleOpenDetail }: BtnAreaProps) => {
  return (
    <div className="flex h-40 gap-10">
      <div className="w-full h-full rounded-20 flex gap-5 justify-center items-center bg-[#D3E6BC] hover:cursor-pointer hover:bg-[#C1D4AA]">
        <span className="text-nowrap text-14">이 지역 와인 보기</span>
        <ArrowRightIcon className="w-16 h-16" />
      </div>
      <div
        onClick={handleOpenDetail}
        className="shrink-0 w-50 h-full rounded-20 bg-(--gray-f0) flex justify-center items-center hover:cursor-pointer hover:bg-(--gray-e0)"
      >
        <ArrowsRightLeftIcon className="w-18 h-18" />
      </div>
    </div>
  );
};

interface MoveBtnProps {
  children: ReactNode;
  handleClickEvent(): void;
  isActive: boolean;
}
const MoveBtn = ({ children, handleClickEvent, isActive }: MoveBtnProps) => {
  return (
    <div
      onClick={handleClickEvent}
      className={`w-40 h-40   rounded-full flex justify-center items-center ${
        isActive
          ? "bg-(--gray-e0) hover:bg-(--gray-c0) hover:cursor-pointer"
          : "bg-(--gray-f0) "
      }`}
    >
      {children}
    </div>
  );
};

export default MainCity;
