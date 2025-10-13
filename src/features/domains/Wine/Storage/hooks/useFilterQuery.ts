/**
 * Storage/hooks/useFilterQuery.ts
 * 필터를 적용하고 불러오고 삭제하는 커스텀 훅
 * 1. url에서 필터를 뽑아서 반환
 * 2. 필터를 적용하는 함수 반환(설정/해제)
 * 3. 필터를 초기화하는 함수 반환
 */
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, FILTER_KEYS } from "@/models/Filter";
import { INIT_FILTER, ALLOWED_FILTER } from "@/constants/Filter";

export const useFilterQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 허용된 필터만 반환
  const sanitizeFilter = (raw: Filter): Filter => {
    const sanitized: Filter = { ...raw };

    FILTER_KEYS.forEach((key) => {
      const list = raw[key] ?? [];
      sanitized[key] = list.filter((v) => ALLOWED_FILTER[key].has(v));
    });

    return sanitized;
  };

  // searchParams -> filter 변환
  const filter: Filter = useMemo(() => {
    const f: Filter = { ...INIT_FILTER };
    FILTER_KEYS.forEach((key) => {
      const value = searchParams.get(key);
      f[key] = value ? value.split(",") : [];
    });
    return sanitizeFilter(f);
  }, [searchParams.toString()]);

  // filter 변경 시 -> searchParams 반영
  const setFilter = useCallback(
    (next: Filter) => {
      const newParams = new URLSearchParams(searchParams);
      Object.entries(next).forEach(([key, value]) => {
        if (value && value.length > 0) {
          newParams.set(key, value.join(","));
        } else {
          newParams.delete(key);
        }
      });

      const sortedSearchParams = new URLSearchParams(
        Array.from(newParams.entries()).sort((a, b) => a[0].localeCompare(b[0]))
      );
      setSearchParams(sortedSearchParams);
    },
    [searchParams, setSearchParams]
  );

  // 필터 선택
  const selectFilter = useCallback(
    (key: keyof Filter, value: string) => {
      const current = new Set(filter[key]);
      current.has(value) ? current.delete(value) : current.add(value);
      setFilter({ ...filter, [key]: Array.from(current) });
    },
    [filter, setFilter]
  );

  // 전체 초기화
  const resetFilter = useCallback(() => {
    const newParams = new URLSearchParams(searchParams);
    FILTER_KEYS.forEach((key) => newParams.delete(key));
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  return { filter, selectFilter, resetFilter };
};
