/**
 * features/main/hooks/useWine.ts
 * 와인 아이디로 와인 데이터를 가져오는 커스텀 훅
 * - 캐시 키: ["wine"]
 * - 성공 시 WineWithWinery 반환
 */
import { WineWithWinery } from "@/models/Wine";
import { useQuery } from "@tanstack/react-query";
import { getWine } from "../api";

export const useWine = (id: number) => {
  // GET 와인
  return useQuery<WineWithWinery>({
    queryKey: ["wine", id],
    queryFn: () => getWine(id),
    enabled: !isNaN(id),
  });
};
