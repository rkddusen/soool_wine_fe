/**
 * features/my/hooks/useOpenForm.ts
 * 계정 설정에서 폼을 오픈하는 커스텀 훅
 */
import { useState } from "react";

export const useOpenForm = () => {
  const [isOpen, setIsForm] = useState<boolean>(false);

  const handleIsOpen = () => {
    setIsForm((prev) => !prev);
  };

  return { isOpen, handleIsOpen };
};
