// TodayWine/TodayWine.tsx
// 서버에서 각 와인 타입(레드, 화이트 등)별로 1개씩 와인 데이터를 받아와 보여주는 컴포넌트
// 성공 시 각 와인 타입에 해당하는 와인은 <WineBox>로 렌더링
import { useEffect, useState } from "react";
import { TodayWineType } from "@/models/Wine";
import { TodayWineResponse } from "@/models/Api";
import { getRandomWines } from "@/utils/api";
import { TYPE_ARRAY } from "@/constants/Wine";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import WineBox from "./WineBox";

const TodayWine = () => {
  // 와인 객체
  const [wine, setWine] = useState<TodayWineType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const callGetRandomWines = async (): Promise<TodayWineResponse> => {
    const data: TodayWineResponse = await getRandomWines();
    return data;
  };

  const mutation = useMutation<TodayWineResponse, AxiosError, void>({
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
      {/* 각 와인 타입 별 와인 박스 영역 */}
      <div className="flex flex-col gap-20 mt-20 md:grid md:grid-cols-2">
        {wine &&
          TYPE_ARRAY.map(
            (v) =>
              v.type !== "etc" && (
                <WineBox key={v.type} type={v.type} wine={wine[v.type]} />
              )
          )}
      </div>
    </section>
  );
};

export default TodayWine;
