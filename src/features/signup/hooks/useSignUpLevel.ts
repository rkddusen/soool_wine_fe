/**
 * features/signup/hooks/useSignUpLevel.ts
 * 회원가입 단계를 관리하는 커스텀 훅
 * 폼 데이터가 변하거나 레벨이 변하면 유효성을 검사
 * - 레벨과 다음 단계, 이전 단계로 넘어가는 함수 반환
 */
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/models/User";
import { useNavigate } from "react-router-dom";
import { useValidForm } from "./useValidForm";

export const useSignUpLevel = (
  inputValues: User,
  setInputValues: React.Dispatch<React.SetStateAction<User>>
) => {
  const [level, setLevel] = useState<number>(1);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { validId, validPassword, validEmail } = useValidForm();

  // 유효성에 따라 레벨 자동 보정
  useEffect(() => {
    if (level < 1 || level > 6) {
      setLevel(1);
    }
    if (level > 1 && validId(inputValues["id"])) {
      setLevel(1);
    }
    if (level > 2 && validPassword(inputValues["password"])) {
      setLevel(2);
    }
    if (
      level > 3 &&
      (validEmail(inputValues["email"]) ||
        !queryClient.getQueryData<boolean>(["emailToken"]) ||
        !queryClient.getQueryData<boolean>(["email"]))
    ) {
      setLevel(3);
    }
    if (level > 4 && !queryClient.getQueryData<boolean>(["isVerifySuccess"])) {
      setLevel(4);
    }
    if (level > 5 && !queryClient.getQueryData<boolean>(["isSignUpSuccess"])) {
      setLevel(5);
    }
  }, [level, inputValues]);

  const handlePrevLevel = () => {
    if (level < 1 || level > 5) return;
    // 아이디 폼에서 뒤로가기
    if (level === 1) {
      navigate(-1);
      return;
    }
    // 비밀번호 폼에서 뒤로가기
    if (level === 2) {
      setInputValues((prev) => ({ ...prev, password: "" }));
      setLevel(1);
      return;
    }
    // 이메일 폼에서 뒤로가기
    if (level === 3) {
      setInputValues((prev) => ({ ...prev, email: "" }));
      setInputValues((prev) => ({ ...prev, password: "" }));
      setLevel(2);
      return;
    }
    // 코드 폼 및 회원가입 폼에서 뒤로가기
    if (level === 4 || level === 5) {
      setInputValues((prev) => ({ ...prev, code: "" }));
      setLevel(3);
      return;
    }
  };

  const handleNextLevel = () => {
    if (level < 1 || level > 5) return;
    // 아이디 폼에서 다음으로
    if (level === 1) {
      setLevel(2);
      return;
    }
    // 비밀번호 폼에서 다음으로
    if (level === 2) {
      setLevel(3);
      return;
    }
    // 이메일 폼에서 다음으로
    if (level === 3) {
      setLevel(4);
      return;
    }
    // 코드 폼에서 다음으로
    if (level === 4) {
      setLevel(5);
      return;
    }
    // 회원가입 폼에서 다음으로
    if (level === 5) {
      setLevel(6);
      return;
    }
  };

  return { level, handlePrevLevel, handleNextLevel };
};
