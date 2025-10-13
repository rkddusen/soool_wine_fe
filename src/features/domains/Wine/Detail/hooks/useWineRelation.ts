/**
 * Detail/hooks/useWineRelation.ts
 * 와인 아이디로 해당 와인과 관련된 와인을 가져오는 커스텀 훅
 * - 타입으로 관련된 와인 > 캐시 키: ["wine-relation-type"]
 * - 국가으로 관련된 와인 > 캐시 키: ["wine-relation-country"]
 * - get 요청 성공 시 각 와인 리스트 반환
 */
import { useQuery } from "@tanstack/react-query";
import { getWineRelationByCountry, getWineRelationByType } from "../api";
import { TypeKey, WineWithWinery } from "@/models/Wine";

export const useWineRelation = (
  id: number,
  type: TypeKey[],
  country: string[]
) => {
  // GET 타입 관련 와인
  const { data: relationByType, isLoading: relationByTypeIsLoading } = useQuery<
    WineWithWinery[]
  >({
    queryKey: ["wine-relation-type", type],
    queryFn: () => getWineRelationByType(id, type),
  });

  // GET 국가 관련 와인
  const { data: relationByCountry, isLoading: relationByCountryIsLoading } =
    useQuery<WineWithWinery[]>({
      queryKey: ["wine-relation-country", country],
      queryFn: () => getWineRelationByCountry(id, country),
    });

  return {
    relationByType,
    relationByCountry,
    isLoading: relationByTypeIsLoading || relationByCountryIsLoading,
  };
};
