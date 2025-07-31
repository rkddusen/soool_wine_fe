/**
 * features/my/hooks/useEmailInputs.ts
 * 이메일 입력 상태를 관리하는 커스텀 훅
 * - 이메일과 인증 코드 입력 상태를 관리하고, 입력 변경 핸들러를 반환
 */
import { useState } from "react";

export const useEmailInputs = () => {
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");

  // 이메일 입력 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // 코드 입력 핸들러
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    setCode(digitsOnly);
  };

  // 숫자 input특성 상 지수 표기법이나 +/- 기호가 허용되기 때문에 이를 막음
  const handleCodeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };

  return {
    email,
    code,
    handleEmailChange,
    handleCodeChange,
    handleCodeKeyDown,
  };
};
