/**
 * features/Auth/LoginHelp/hooks/useLevel.ts
 * 아이디 및 비밀번호 찾기 단계를 관리하는 커스텀 훅
 * - 레벨과 다음 단계, 이전 단계로 넘어가는 함수 반환
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLevel = (maxLevel: number) => {
  const [level, setLevel] = useState<number>(1);
  const navigate = useNavigate();

  const handlePrevLevel = () => {
    if (level < 1 || level > maxLevel) return;
    // 레벨 1 폼에서 뒤로가기
    if (level === 1) {
      navigate(-1);
      return;
    }
    setLevel((prev) => prev - 1);
  };

  const handleNextLevel = () => {
    if (level < 1 || level > maxLevel) return;
    setLevel((prev) => prev + 1);
  };

  return { level, handlePrevLevel, handleNextLevel };
};
