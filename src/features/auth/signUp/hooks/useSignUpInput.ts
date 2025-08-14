/**
 * features/signup/hooks/useSignUpInput.ts
 * 회원가입 폼을 관리하는 커스텀 훅
 * - 폼의 onChange 함수와 폼 데이터 반환
 */
import { useState } from "react";
import { SignUp } from "@/models/auth/User";

export const useSignUpInput = () => {
  const [inputValues, setInputValues] = useState<SignUp>({
    id: "",
    password: "",
    email: "",
    code: "",
  });

  const handleInputChange =
    (name: keyof SignUp) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, type } = event.target;
      setInputValues((prev) => ({
        ...prev,
        [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
      }));
    };

  const handleEmailSelect = (email: string) => {
    setInputValues((prev) => ({
      ...prev,
      email: email,
    }));
  };

  return { inputValues, setInputValues, handleInputChange, handleEmailSelect };
};
