/**
 * Detail/hooks/useRelationStandard.ts
 * 관련 와인의 기준이 되는 값을 찾는 커스텀 훅
 * useLocation의 state에서 filter를 찾아서
 * - type과 country가 있으면 해당 값 반환
 * - 없으면 해당 와인의 type과 country 반환
 */
import { TypeKey } from "@/models/Wine";
import { useLocation } from "react-router-dom";

export const useRelationStandard = (nowType: TypeKey, nowCountry: string) => {
  // state에서 type이나 country 추출
  // 검색 시 필터를 설정하고 들어온 경우, 그 필터를 기준으로 와인을 찾아주기 위함
  const location = useLocation();
  let standardType: TypeKey[] = [];
  let standardCountry: string[] = [];
  if (location.state?.filter) {
    const f = location.state.filter;
    if (f.type.length > 0) {
      standardType = [...f.type];
    }
    if (f.country.length > 0) {
      standardCountry = [...f.country];
    }
  }

  // 만약 state에 type이나 country가 없으면
  // 검색 시 필터를 설정하지 않고 들어온 경우, 그 와인의 정보를 기준으로 와인을 찾아주기 위함
  if (standardType.length === 0) {
    standardType.push(nowType);
  }
  if (standardCountry.length === 0) {
    standardCountry.push(nowCountry);
  }

  return { standardType, standardCountry };
};
