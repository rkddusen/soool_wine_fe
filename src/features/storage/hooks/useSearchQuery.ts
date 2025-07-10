/**
 * features/storage/hooks/useSearchQuery.ts
 * url에서 검색어를 불러오는 커스텀 훅
 * 검색어 반환
 */
import { useSearchParams } from "react-router-dom";

export const useSearchQuery = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  return { search };
};
