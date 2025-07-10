/**
 * features/storage/hooks/useWines.ts
 * 와인창고에서 와인 데이터를 가져오는 커스텀 훅
 * - 캐시 키: ["wines"]
 * - 성공 시 WinesResponse 반환
 */
import { useInfiniteQuery } from "@tanstack/react-query";
import { Filter } from "@/models/Filter";
import { getWines } from "@/features/storage/api";

export const useWines = (search: string | null, filter: Filter) => {
  return useInfiniteQuery({
    queryKey: ["wines", search, JSON.stringify(filter)],
    queryFn: ({ pageParam }) => getWines(pageParam, search, filter),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.totalPages > allPages.length) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });
};
