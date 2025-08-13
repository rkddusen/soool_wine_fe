/**
 * features/my/hooks/useEmailInputs.ts
 * 이메일 입력 상태를 관리하는 커스텀 훅
 * - 이메일과 인증 코드 입력 상태를 관리하고, 입력 변경 핸들러를 반환
 */
import { useRef, useState } from "react";

export const useEmailInputs = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const codeInputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");

  // 이메일 입력 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleEmailSelect = (selectedEmail: string) => {
    setEmail(selectedEmail);
  };

  // 코드 입력 핸들러
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    setCode(digitsOnly);
  };

  return {
    emailInputRef,
    codeInputRef,
    email,
    code,
    handleEmailChange,
    handleEmailSelect,
    handleCodeChange,
  };
};
