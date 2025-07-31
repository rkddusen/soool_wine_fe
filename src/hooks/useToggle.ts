/**
 * hooks/useToggle.ts
 * 토글 상태를 관리하는 커스텀 훅
 * - 초기 상태를 받아 토글 상태와 토글 함수를 반환
 */

import { useState } from "react";

export const useToggle = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, toggle };
};
