// utils/queryParams.ts
import { Filter } from "../models/Filter";

export const getFilterFromQueryParams = (
  searchParams: URLSearchParams
): Filter => {
  const getParamValues = (key: string): string[] => {
    const value = searchParams.get(key);
    return value ? value.split(",") : [];
  };

  return {
    type: getParamValues("type"),
    sweetness: getParamValues("sweetness"),
    acidity: getParamValues("acidity"),
    body: getParamValues("body"),
    tannin: getParamValues("tannin"),
    country: getParamValues("country"),
  };
};

// validateFilter에서 변경된 filter를 다시 searchParams에 세팅
export const setQueryParamsFromFilter = (
  searchParams: URLSearchParams,
  filter: Filter
): void => {
  const setOrDelete = (key: keyof Filter) => {
    filter[key]?.length
      ? searchParams.set(key, filter[key]!.join(","))
      : searchParams.delete(key);
  };

  Object.keys(filter).forEach((key) => setOrDelete(key as keyof Filter));
};
