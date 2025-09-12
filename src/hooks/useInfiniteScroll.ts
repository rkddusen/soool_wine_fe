// hooks/useInfiniteScroll.ts
import {
  useInfiniteQuery,
  QueryKey,
  InfiniteData,
} from "@tanstack/react-query";

interface CursorResponse<T, ID = number | string> {
  content: T[];
  hasNext: boolean;
  nextCursorId: ID | null;
  nextCursorDate?: number | null;
  totalElements?: number;
}

interface FetchFunction<T, ID = number | string> {
  ({
    cursorId,
    cursorDate,
    queryParams,
  }: {
    cursorId: ID | null;
    cursorDate?: number | null;
    queryParams?: any;
  }): Promise<CursorResponse<T, ID>>;
}

export function useInfiniteScroll<T, ID extends number | string = number>(
  queryKey: QueryKey,
  fetchFn: FetchFunction<T, ID>,
  queryParams?: any
) {
  const { data, ...rest } = useInfiniteQuery<
    CursorResponse<T, ID>,
    Error,
    InfiniteData<CursorResponse<T, ID>>,
    QueryKey,
    { cursorId: ID | null; cursorDate?: number | null } // pageParam 타입
  >({
    queryKey: [...queryKey, queryParams],
    queryFn: ({ pageParam }) =>
      fetchFn({
        cursorId: pageParam?.cursorId,
        cursorDate: pageParam?.cursorDate,
        queryParams,
      }),
    initialPageParam: { cursorId: null, cursorDate: null },
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNext) {
        return {
          cursorId: lastPage.nextCursorId,
          cursorDate: lastPage.nextCursorDate,
        };
      }
      return undefined;
    },
  });

  const items = data?.pages.flatMap((page) => page.content) ?? [];

  return {
    items,
    ...rest,
  };
}
