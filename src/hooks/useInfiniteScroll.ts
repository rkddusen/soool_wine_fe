// hooks/useInfiniteScroll.ts
import { useInfiniteQuery, QueryKey } from "@tanstack/react-query";

interface PageableResponse<T> {
  totalPages: number;
  totalElements: number;
  content: T[];
}

interface FetchFunction<T> {
  ({
    pageParam,
    queryParams,
  }: {
    pageParam: number;
    queryParams?: any;
  }): Promise<PageableResponse<T>>;
}

export function useInfiniteScroll<T>(
  queryKey: QueryKey,
  fetchFn: FetchFunction<T>,
  queryParams?: any
) {
  return useInfiniteQuery({
    queryKey: [...queryKey, queryParams],
    queryFn: ({ pageParam }) => fetchFn({ pageParam, queryParams }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.totalPages > allPages.length) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });
}
