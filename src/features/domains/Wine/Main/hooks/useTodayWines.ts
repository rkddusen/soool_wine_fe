/**
 * Main/hooks/useTodayWines.ts
 * 오늘의 와인 데이터를 가져오는 커스텀 훅
 * - 캐시 키: ["today-wine"]
 * - 성공 시 TodayWineType 반환
 */
import { TodayWineType } from "@/models/Wine";
import { useQuery } from "@tanstack/react-query";
import { getTodayWines } from "../api";

export const useTodayWines = () => {
  return useQuery<TodayWineType>({
    queryKey: ["today-wine"],
    queryFn: getTodayWines,
  });
};
