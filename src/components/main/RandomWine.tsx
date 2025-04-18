import { useEffect, useState } from "react";
import { Country, WineWithWinery } from "../../models/Wine";
import { Link } from "react-router-dom";
import { RandomWineApiResponse } from "../../models/Api";
import { AxiosResponse } from "axios";
import { getRandomWine } from "../../utils/api";

const WINETYPE = [
  {
    type: "Red Wine",
    bg: "bg-(--red-wine)",
  },
  {
    type: "White Wine",
    bg: "bg-(--white-wine)",
  },
  {
    type: "Rose Wine",
    bg: "bg-(--rose-wine)",
  },
  {
    type: "Sparkling Wine",
    bg: "bg-(--sparkling-wine)",
  },
];

const RandomWine = () => {
  const [wine, setWine] = useState<WineWithWinery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getWineData = async () => {
    try {
      const response: AxiosResponse<RandomWineApiResponse> =
        await getRandomWine();
      setWine(response.data.content);
    } catch (error) {
      setError("Error getWineData");
      console.log("Error getWineData: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWineData();
  }, []);

  if (loading) return <div>Loading</div>;

  return (
    <section className="w-full mt-70">
      <p className="text-24 md:text-28">오늘의 랜덤 와인</p>
      <div className="flex flex-col gap-20 mt-20 md:grid md:grid-cols-2">
        {WINETYPE.map((_, i) => (
          <RandomWineBox id={i} wine={wine[i]} />
        ))}
      </div>
    </section>
  );
};

interface RandomWineBoxComponentProps {
  id: number;
  wine?: WineWithWinery;
}

const RandomWineBox = ({ id, wine }: RandomWineBoxComponentProps) => {
  const countryInfo = wine ? Country.get(wine.country) : null;
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <Link
      to={wine ? `/wine/${wine.id}` : ""}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex flex-col w-full overflow-hidden bg-white rounded-15 h-320">
        <div
          className={`shrink-0 ml-10 mt-10 w-[45%] max-w-200 h-50 flex flex-row justify-center items-center rounded-15 ${WINETYPE[id].bg} text-white`}
        >
          <span className="text-center text-14 md:text-16">
            {WINETYPE[id].type}
          </span>
        </div>
        <div className="w-full h-full p-20">
          <div className="flex items-center justify-center w-full h-full">
            {wine ? (
              <>
                <div className="w-[70%] h-full pt-55 break-keep">
                  <div className="line-clamp-1 leading-[120%]">
                    <span className="text-12 sm:text-14">
                      {countryInfo ? countryInfo.emoji : null}
                    </span>
                    <span className="ml-5 text-12 sm:text-14">
                      {wine.region}
                    </span>
                  </div>
                  <div className="mt-5">
                    <p className="break-words text-14 sm:text-16 line-clamp-2 leading-[120%]">
                      {wine.kname}
                    </p>
                    <p className="mt-5 text-12 sm:text-14 text-(--gray-78) line-clamp-2 leading-[120%]">
                      {wine.ename}
                    </p>
                  </div>
                  <div className="relative mt-20 z-2">
                    <WineTaste taste="당도" degree={wine.sweetness} />
                    <WineTaste taste="산도" degree={wine.acidity} />
                    <WineTaste taste="바디" degree={wine.body} />
                    <WineTaste taste="타닌" degree={wine.tannin} />
                  </div>
                </div>
                <div className="relative w-[30%] h-full">
                  <img
                    src={wine.image ? wine.image : undefined}
                    className={`object-cover max-w-none absolute center-absolute ${
                      isHover ? "h-[85%]" : "h-[75%]"
                    } duration-300`}
                  />
                </div>
              </>
            ) : (
              <p className="text-center">
                와인을 불러오는 데에 문제가 발생했습니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

interface WineTasteComponentProps {
  taste: string;
  degree: number | null;
}
const WineTaste = ({ taste, degree }: WineTasteComponentProps) => {
  const degreeFill: string[] = [
    "bg-very-light-degree",
    "bg-light-degree",
    "bg-medium-degree",
    "bg-full-degree",
    "bg-very-full-degree",
  ];

  return (
    <div className="flex flex-row items-center mt-10">
      <span className="shrink-0 text-14 sm:text-16">{taste}</span>
      {degree ? (
        <>
          {Array.from({ length: degree }).map((_, i) => (
            <div
              key={i}
              className={`shrink-0 ml-10 rounded-full w-12 h-12 sm:w-14 sm:h-14 ${degreeFill[i]}`}
            ></div>
          ))}
        </>
      ) : (
        <p className="ml-10 text-12 sm:text-14">정보 없음</p>
      )}
    </div>
  );
};

export default RandomWine;
