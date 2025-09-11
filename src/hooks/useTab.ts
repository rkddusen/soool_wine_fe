/**
 * /hooks/useTab.ts
 * 마이 페이지 탭 상태를 관리하는 커스텀 훅
 * - 현재 탭 상태를 관리하고, URL의 쿼리 파라미터를 통해 탭 상태를 동기화
 */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useTab = (key: string, size: number) => {
  const [tab, setTab] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  // 초기 탭 상태 설정
  useEffect(() => {
    const initialTab = Number(searchParams.get(key)) || 1;
    if (initialTab >= 1 && initialTab <= size) {
      setTab(initialTab);
    } else {
      setSearchParams({ [key]: "1" }, { replace: true });
    }
  }, [size, searchParams, key]);

  // 탭 변경 함수
  const handleClickMenu = (num: number) => {
    setSearchParams({ [key]: String(num) });
    setTab(num);
  };

  return { tab, handleClickMenu };
};
