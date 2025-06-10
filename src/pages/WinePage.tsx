import WineSection from "@/components/wine/WineSection";
import { WineResponse } from "@/models/Api";
import { getWine, getWineWishlist } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const WinePage = () => {
  const { id } = useParams();
  const wineId = Number(id);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

  const callGetWine = async (id: number): Promise<WineResponse> => {
    const response: WineResponse = await getWine(id);
    return response;
  };
  const callGetWineWishlist = async (id: number): Promise<boolean> => {
    const response: boolean = await getWineWishlist(id);
    return response;
  };

  // 와인 정보 get
  const {
    data: wineInfo,
    isError: isWineInfoError,
    isLoading: isWineInfoLoading,
  } = useQuery<WineResponse>({
    queryKey: ["wine", wineId],
    queryFn: () => callGetWine(wineId),
    enabled: !isNaN(wineId),
  });

  // 위시리스트 유무 get
  const {
    data: wishlist,
    isLoading: isWishlistLoading,
    refetch: refetchWineWishlist,
  } = useQuery<boolean, Error, boolean>({
    queryKey: ["wine-wishlist", wineId],
    queryFn: () => callGetWineWishlist(wineId),
    enabled: !isNaN(wineId),
  });

  useEffect(() => {
    if (isInitialLoading) {
      setIsInitialLoading(false);
    }
  }, [isWineInfoLoading, isWishlistLoading]);

  if (isInitialLoading) return <div>로딩 중입니다.</div>;
  if (isWineInfoError) return <div>데이터 요청에 실패했습니다.</div>;
  if (!wineInfo?.content) return <div>와인 정보가 없습니다.</div>;
  return (
    <>
      <WineSection
        wineInfo={wineInfo.content}
        wishlist={wishlist ?? false}
        refetchWineWishlist={refetchWineWishlist}
      />
    </>
  );
};

export default WinePage;
