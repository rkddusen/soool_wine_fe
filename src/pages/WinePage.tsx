import WineMemoSection from "@/components/wine/WineMemoSection";
import WineSection from "@/components/wine/WineSection";
import WineStructureSection from "@/components/wine/WineStructureSection";
import { WineResponse } from "@/models/Api";
import { getWine, getWineMemo, getWineWishlist } from "@/utils/api";
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
  const callGetWineMemo = async (id: number): Promise<string[]> => {
    const response: string[] = await getWineMemo(id);
    return response;
  };

  // 와인 정보 get
  const {
    data: wine,
    isError: isWineError,
    isLoading: isWineLoading,
    refetch: refetchWine,
    isRefetching: isWineRefetching,
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

  // 와인 메모 get
  const {
    data: wineMemo,
    isError: isWineMemoError,
    isLoading: isWineMemoLoading,
    refetch: refetchWineMemo,
  } = useQuery<string[]>({
    queryKey: ["wine-memo", wineId],
    queryFn: () => callGetWineMemo(wineId),
    enabled: !isNaN(wineId),
  });

  useEffect(() => {
    if (isInitialLoading) {
      if (!isWineLoading && !isWishlistLoading && !isWineMemoLoading)
        setIsInitialLoading(false);
    }
  }, [isWineLoading, isWishlistLoading, isWineMemoLoading]);

  if (isInitialLoading || isWineRefetching) return <div>로딩 중입니다.</div>;
  if (isWineError) return <div>데이터 요청에 실패했습니다.</div>;
  if (!wine?.content) return <div>와인 정보가 없습니다.</div>;
  return (
    <>
      <WineSection
        wineInfo={wine.content}
        wishlist={wishlist ?? false}
        refetchWineWishlist={refetchWineWishlist}
      />
      <WineMemoSection
        wineId={wine.content.id}
        memo={wineMemo ?? null}
        isWineMemoError={isWineMemoError}
        refetchWineMemo={refetchWineMemo}
        isWineMemoLoading={isWineMemoLoading}
      />
      <WineStructureSection
        structure={wine.content.structure}
        refetchWine={refetchWine}
      />
    </>
  );
};

export default WinePage;
