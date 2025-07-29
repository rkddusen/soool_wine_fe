/**
 * features/my/hooks/useInputs.ts
 * 이메일을 변경하는데 필요한 변수와 함수를 제공하는 커스텀 훅
 * - 이메일과 인증 코드 값을 반환하고, 각 폼의 변경 함수를 반환
 */
import { useState } from "react";

export const useInputs = () => {
  const [emailValue, setEmailValue] = useState<string>("");
  const [codeValue, setCodeValue] = useState<number | "">("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, type } = event.target;
    if (type === "number") {
      setCodeValue(value === "" ? "" : Number(value));
    } else {
      setEmailValue(event.target.value);
    }
  };

  return {
    emailValue,
    codeValue,
    handleInputChange,
  };
};
