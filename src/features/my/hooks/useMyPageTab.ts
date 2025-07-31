/**
 * features/my/hooks/useMyPageTab.ts
 * 마이 페이지 탭 상태를 관리하는 커스텀 훅
 * - 현재 탭 상태를 관리하고, URL의 쿼리 파라미터를 통해 탭 상태를 동기화
 */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useMyPageTab = (size: number) => {
  const [tab, setTab] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  // 초기 탭 상태 설정
  useEffect(() => {
    const initialTab = Number(searchParams.get("mTab")) || 1;
    if (initialTab >= 1 && initialTab <= size) {
      setTab(initialTab);
    } else {
      setSearchParams((prev) => {
        prev.set("mTab", "1");
        return prev;
      });
    }
  }, [searchParams, size, setSearchParams]);

  // 탭 변경 함수
  const handleClickMenu = (num: number) => {
    searchParams.set("mTab", String(num));
    setSearchParams(searchParams);
  };

  return { tab, handleClickMenu };
};
