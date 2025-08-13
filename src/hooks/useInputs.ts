/**
 * hooks/useInputs.ts
 * 아이디, 비밀번호, 이메일, 코드 폼을 관리하는 커스텀 훅
 */
import { useState } from "react";

// id 입력
export const useIdInput = () => {
  const [id, setId] = useState<string>("");
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  return { id, handleIdChange };
};

// password 입력
export const usePasswordInput = () => {
  const [password, setPassword] = useState<string>("");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handlePasswordReset = () => setPassword("");
  return { password, handlePasswordChange, handlePasswordReset };
};

// email + code 입력 세트
export const useEmailCodeInputs = () => {
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleEmailSelect = (selectedEmail: string) => {
    setEmail(selectedEmail);
  };
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    setCode(digitsOnly);
  };

  const handleEmailReset = () => setEmail("");
  const handleCodeReset = () => setCode("");

  return {
    email,
    code,
    handleEmailChange,
    handleEmailSelect,
    handleCodeChange,
    handleEmailReset,
    handleCodeReset,
  };
};
