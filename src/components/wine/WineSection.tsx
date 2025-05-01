import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getWine } from "@/utils/api";
import { WineResponse } from "@/models/Api";
import { WineWithWinery } from "@/models/Wine";
import { useParams } from "react-router-dom";
import {
  WineCityAndWineryBox,
  WineImageBox,
  WineNameBox,
  WineTypeBox,
  WineCountryBox,
} from "./WineInfoBox";

const WineSection = () => {
  const { id } = useParams();
  const [wineInfo, setWineInfo] = useState<WineWithWinery | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const callGetWine = async (id: number): Promise<WineResponse> => {
    const response: WineResponse = await getWine(id);
    return response;
  };

  const mutation = useMutation<WineResponse, Error, number>({
    mutationFn: callGetWine,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: ({ content }: WineResponse) => {
      console.log(content);
      setWineInfo(content);
    },
    onError: (error: Error) => {
      setError("Error get wine");
      console.log("Error get wine: ", error);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  useEffect(() => {
    mutation.mutate(Number(id));
  }, []);

  if (loading) return <div>Loading</div>;
  if (!wineInfo) return <div></div>;
  return (
    <div>
      <div className="flex flex-col justify-center gap-20 px-20 pt-20 mx-auto md:flex-row md:px-40 md:max-w-1000 max-w-500">
        <WineImageBox image={wineInfo.image} ename={wineInfo.ename} />
        <div className="flex flex-col w-full gap-20">
          <WineTypeBox type={wineInfo.type} />
          <WineCountryBox country={wineInfo.country} />
          <WineCityAndWineryBox
            region={wineInfo.region}
            country={wineInfo.country}
            city={wineInfo.city}
            winery={wineInfo.winery}
          />
          <WineNameBox
            ename={wineInfo.ename}
            kname={wineInfo.kname}
            abv={wineInfo.abv}
          />
        </div>
      </div>
      <div className="px-20 mx-auto md:px-40 max-w-1280"></div>
    </div>
  );
};

export default WineSection;
