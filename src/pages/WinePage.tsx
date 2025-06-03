import WineSection from "@/components/wine/WineSection";
import { WineResponse } from "@/models/Api";
import { getWine } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const WinePage = () => {
  const { id } = useParams();
  const wineId = Number(id);

  const callGetWine = async (id: number): Promise<WineResponse> => {
    const response: WineResponse = await getWine(id);
    return response;
  };

  const { data, isError, isLoading } = useQuery<WineResponse>({
    queryKey: ["wineInfo", wineId],
    queryFn: () => callGetWine(wineId),
    enabled: !isNaN(wineId),
  });

  if (isLoading) return <div>로딩 중입니다.</div>;
  if (isError) return <div>데이터 요청에 실패했습니다.</div>;
  if (!data?.content) return <div>와인 정보가 없습니다.</div>;
  return (
    <>
      <WineSection wineInfo={data.content} />
    </>
  );
};

export default WinePage;
