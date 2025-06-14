import { useEffect, useState } from "react";
import { RandomWineType, WineWithWinery } from "@/models/Wine";
import { Link } from "react-router-dom";
import { RandomWineResponse } from "@/models/Api";
import { getRandomWines } from "@/utils/api";
import { WINETYPE_ARRAY, WINESTRUCTUREDEGREE } from "@/data/Wine";
import { COUNTRY_LOOKUP } from "@/data/Country";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

const RandomWine = () => {
  const [wine, setWine] = useState<RandomWineType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const callGetRandomWines = async (): Promise<RandomWineResponse> => {
    const data: RandomWineResponse = await getRandomWines();
    return data;
  };

  const mutation = useMutation<RandomWineResponse, AxiosError, void>({
    mutationFn: callGetRandomWines,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      setWine(data.content);
    },
    onError: (error) => {
      setError("Error getWineData");
      console.log("Error getRandomWines:", error);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  if (loading) return <div>Loading</div>;

  return (
    <section className="w-full px-20 mx-auto mt-70 md:px-40 max-w-1280">
      <p className="text-20 md:text-24">오늘의 와인</p>
      <div className="flex flex-col gap-20 mt-20 md:grid md:grid-cols-2">
        {wine &&
          WINETYPE_ARRAY.map(
            (v, i) =>
              v.type !== "etc" && (
                <RandomWineBox key={v.type} id={i} wine={wine[v.type]} />
              )
          )}
      </div>
    </section>
  );
};

interface RandomWineBoxComponentProps {
  id: number;
  wine?: WineWithWinery;
}

const RandomWineBox = ({ id, wine }: RandomWineBoxComponentProps) => {
  console.log(wine);
  const countryInfo =
    wine && (COUNTRY_LOOKUP[wine.country] ?? COUNTRY_LOOKUP["etc"]);
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <Link
      to={wine ? `/wine/${wine.id}` : ""}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex flex-col w-full p-10 overflow-hidden bg-white rounded-15 h-320">
        <div
          className={`shrink-0 w-[45%] max-w-200 h-50 flex flex-row justify-center items-center rounded-15 ${WINETYPE_ARRAY[id].bg} text-white`}
        >
          <span className="text-center text-14 sm:text-16">
            {WINETYPE_ARRAY[id].label}
          </span>
        </div>
        <div className="w-full h-full p-10">
          <div className="relative h-full">
            {wine ? (
              <>
                <div className="w-[70%] h-full break-keep z-10">
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
                      {wine.ename}
                    </p>
                    <p className="mt-5 text-12 sm:text-14 text-(--gray-78) line-clamp-2 leading-[120%]">
                      {wine.kname}
                    </p>
                  </div>
                  <div className="flex flex-col gap-10 mt-20">
                    <WineTaste taste="당도" degree={wine.structure.sweetness} />
                    <WineTaste taste="산도" degree={wine.structure.acidity} />
                    <WineTaste taste="바디" degree={wine.structure.body} />
                    <WineTaste taste="타닌" degree={wine.structure.tannin} />
                  </div>
                </div>
                <div className="absolute w-[30%] right-0 h-[calc(100%+50px)] bottom-0">
                  <img
                    src={wine.image ? wine.image : undefined}
                    className={`object-cover max-w-none absolute center-absolute ${
                      isHover ? "h-[85%]" : "h-[75%]"
                    } duration-300`}
                  />
                </div>
              </>
            ) : (
              <p className="w-full text-center">
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
  return (
    <div className="flex items-center gap-10">
      <span className="text-14 sm:text-16">{taste}</span>
      {degree ? (
        <div className="flex gap-10">
          {Array.from({ length: degree }).map((_, i) => (
            <div
              key={i}
              className={`shrink-0 rounded-full w-12 h-12 sm:w-14 sm:h-14 ${WINESTRUCTUREDEGREE[i]}`}
            ></div>
          ))}
        </div>
      ) : (
        <p className="text-12 sm:text-14">정보 없음</p>
      )}
    </div>
  );
};

export default RandomWine;
