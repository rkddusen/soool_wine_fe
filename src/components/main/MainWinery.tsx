import { ReactNode, useCallback, useEffect, useState } from "react";
import {
  CountryInfo,
  Country,
  WineryShortDescription,
} from "../../models/Wine";
import { WineryApiResponse } from "../../models/Api";
import { AxiosResponse } from "axios";
import { getWinery } from "../../utils/api";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { EmblaCarouselType } from "embla-carousel";

const MainWinery = () => {
  const OPTIONS: EmblaOptionsType = { loop: true, watchDrag: false };
  const AUTOPLAYOPTIONS = {
    delay: 5000,
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay(AUTOPLAYOPTIONS),
  ]);
  const [slides, setSlides] = useState<(string | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [countryInfo, setCountryInfo] = useState<CountryInfo>({
    ename: "",
    kname: "",
    emoji: "",
  });
  const [winery, setWinery] = useState<WineryShortDescription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getWineryData = async () => {
    try {
      const response: AxiosResponse<WineryApiResponse> = await getWinery();
      setWinery(response.data.content);
      const _slides = response.data.content.map((v) => v.wineryImage);
      setSlides(_slides);
    } catch (error) {
      setError("Error getWineData");
      console.log("Error getWineData: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWineryData();
  }, []);

  useEffect(() => {
    if (winery.length > 0) {
    }
  }, [winery]);

  const updateScrollSnapState = useCallback((emblaApi: EmblaCarouselType) => {
    const index = emblaApi.selectedScrollSnap();
    setCurrentIndex(index);
    setCountryInfo(
      Country.get(winery[index]?.country) || {
        ename: "",
        kname: "",
        emoji: "",
      }
    );
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateScrollSnapState(emblaApi);
    emblaApi.on("select", updateScrollSnapState);
    emblaApi.on("reInit", updateScrollSnapState);

    return () => {
      emblaApi.off("select", updateScrollSnapState);
      emblaApi.off("reInit", updateScrollSnapState);
    };
  }, [emblaApi, updateScrollSnapState]);

  const restartAutoplay = useCallback(() => {
    if (emblaApi) {
      const autoplay = emblaApi.plugins().autoplay;
      autoplay.reset();
    }
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      restartAutoplay();
    }
  }, [emblaApi]);

  if (loading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="w-full pt-70">
      <p className="text-25 md:text-30">주요 와이너리 지역</p>
      <div className="flex flex-row justify-center w-full bg-[#F2F3EA] rounded-15 py-80 mt-20 overflow-hidden">
        <div className="relative w-400 h-480 sm:w-450 sm:h-540 px-25">
          <div className="relative flex flex-col w-full h-full bg-white rounded-20">
            <MoveBtn
              dir="-left-20"
              mdDir="md:-left-25"
              handleClickEvent={scrollPrev}
            >
              <svg
                className="w-18 h-18 md:w-24 md:h-24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12H6M12 5L5 12L12 19"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MoveBtn>
            <div className="w-full overflow-hidden h-1/2 rounded-t-15 shrink-0">
              <ul ref={emblaRef} className="w-full h-full">
                <div className="flex w-full h-full">
                  {Array.from({ length: slides.length }).map((_, i) => (
                    <li
                      className="box-content pl-10 w-400 sm:w-450 shrink-0"
                      key={i}
                    >
                      <img
                        className="object-cover w-full h-full"
                        src={slides[i] ? slides[i] : undefined}
                        alt=""
                      />
                    </li>
                  ))}
                </div>
              </ul>
            </div>
            <div className="w-full h-1/2 shrink-0">
              <div className="flex flex-col justify-between w-full h-full py-20 px-35">
                <div>
                  <div className="text-12 sm:text-14">
                    <span>{countryInfo ? countryInfo.emoji : null}</span>
                    <span className="ml-5">
                      {countryInfo ? countryInfo.kname : null}
                    </span>
                  </div>
                  <p className="mt-5 text-18 sm:text-20">
                    {winery[currentIndex].region}
                  </p>
                  <p className="mt-10 whitespace-pre-wrap break-keep text-14 sm:text-16 line-clamp-[8]">
                    {winery[currentIndex].shortDescription}
                  </p>
                </div>
                <div className="shrink-0 w-full h-30 sm:h-40 rounded-20 flex flex-row justify-center items-center bg-[#D3E6BC] hover:cursor-pointer hover:bg-[#C1D4AA]">
                  <span className="mr-5 text-nowrap text-12 sm:text-14">
                    이 지역 와인 보기
                  </span>
                  <svg
                    className="w-16 h-16 sm:w-20 sm:h-20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.16666 9.99996H15M9.99999 4.16663L15.8333 9.99996L9.99999 15.8333"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <MoveBtn
              dir="-right-20"
              mdDir="md:-right-25"
              handleClickEvent={scrollNext}
            >
              <svg
                className="w-18 h-18 md:w-24 md:h-24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H18M12 5L19 12L12 19"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MoveBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MoveBtnComponentProps {
  children: ReactNode;
  dir: string;
  mdDir: string;
  handleClickEvent(): void;
}

const MoveBtn = ({
  children,
  dir,
  mdDir,
  handleClickEvent,
}: MoveBtnComponentProps) => {
  return (
    <div
      onClick={handleClickEvent}
      className={`z-2 absolute y-center-absolute ${dir} ${mdDir} w-40 h-40 md:w-50 md:h-50 bg-white border-1 border-78-gray rounded-full flex justify-center items-center hover:cursor-pointer`}
    >
      {children}
    </div>
  );
};

export default MainWinery;
