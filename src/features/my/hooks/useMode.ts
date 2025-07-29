/**
 * features/my/hooks/useMode.ts
 * 현재 마이페이지 모드를 확인하는 커스텀 훅
 */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useMode = (size: number) => {
  const [mode, setMode] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  // 현재 마이페이지 모드 확인
  useEffect(() => {
    const _mode = Number(searchParams.get("mTab"));
    if (!isNaN(_mode) && Number.isInteger(_mode) && _mode >= 1 && _mode <= size)
      setMode(_mode);
  }, [searchParams]);

  const handleClickMenu = (num: number) => {
    searchParams.set("mTab", String(num));
    setSearchParams(searchParams);
  };

  return { mode, handleClickMenu };
};
