/**
 * features/login/hooks/useLoginform.ts
 * 아이디와 비밀번호를 관리하는 커스텀 훅
 * - 아이디, 비밀번호와 각각의 handleChange 함수 반환
 */
import { useState } from "react";

export const useLoginform = () => {
  const [idInput, setIdInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  const handleChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _input = event.target.value;
    setIdInput(_input);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _input = event.target.value;
    setPasswordInput(_input);
  };

  return {
    idInput,
    handleChangeId,
    passwordInput,
    handleChangePassword,
  };
};
