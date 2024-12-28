import { useEffect, useState } from "react";
import { Country, WineWithWinery } from "../../models/Wine";
import { Link } from "react-router-dom";
import { RandomWineApiResponse } from "../../models/Api";
import { AxiosResponse } from "axios";
import { getRandomWine } from "../../utils/api";

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
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full mt-70">
      <p className="text-25 md:text-30">오늘의 랜덤 와인</p>
      <div className="flex flex-col gap-20 mt-20 md:grid md:grid-cols-2">
        <RandomWineBox type="Red Wine" wine={wine[0]} />
        <RandomWineBox type="White Wine" wine={wine[1]} />
        <RandomWineBox type="Rose Wine" wine={wine[2]} />
        <RandomWineBox type="Sparkling Wine" wine={wine[3]} />
      </div>
    </div>
  );
};

interface RandomWineBoxComponentProps {
  type: string;
  wine: WineWithWinery;
}

const RandomWineBox = ({ type, wine }: RandomWineBoxComponentProps) => {
  const countryInfo = Country.get(wine.country);
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <Link
      to={`/wine/${wine.id}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="relative w-full overflow-hidden rounded-15 bg-f5-gray h-320">
        <div
          className={`absolute top-0 left-0 bg-white w-[40%] h-55 flex flex-row justify-center items-center rounded-tl-15 rounded-br-15
          before:content-[url('/src/assets/rounded.svg')] before:w-15 before:h-15 before:absolute before:right-[-15px] before:top-0
          after:content-[url('/src/assets/rounded.svg')] after:w-15 after:h-15 after:absolute after:bottom-[-15px] after:left-0`}
        >
          <span className="text-center text-14 sm:text-16">{type}</span>
        </div>
        <div className="w-full h-full px-20 py-20">
          <div className="flex w-full h-full">
            <div className="w-[70%] h-full pt-55 break-keep">
              <div className="line-clamp-1 leading-[120%]">
                <span className="text-12 sm:text-14">
                  {countryInfo ? countryInfo.emoji : null}
                </span>
                <span className="ml-5 text-12 sm:text-14">{wine.region}</span>
              </div>
              <div className="mt-5">
                <p className="break-words text-14 sm:text-16 line-clamp-2 leading-[120%]">
                  {wine.kname}
                </p>
                <p className="mt-5 text-12 sm:text-14 text-78-gray line-clamp-2 leading-[120%]">
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
