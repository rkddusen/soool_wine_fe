// FinalLevel.tsx
// 마지막으로 사용자를 등록하기 위한 레벨
// 사용자 등록 성공하면 Complete로 이동
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { SignUp } from "@/models/auth/User";
import { useSignUp } from "../../hooks/useSignUp";
import { AxiosError } from "axios";
import { NextBtn, PrevBtn } from "@/components";
import { ApiErrorResponse } from "@/models/ApiError";

interface FinalLevelProps {
  user: SignUp;
  onPrevLevel: () => void;
  onNextLevel: () => void;
}
const FinalLevel = ({ user, onPrevLevel, onNextLevel }: FinalLevelProps) => {
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useSignUp({
    onSuccess: () => {
      queryClient.setQueryData(["isSignUpSuccess"], true);
      onNextLevel();
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      if (error.response?.data.status === 409) {
        const errorMsg = error.response?.data.message;
        if (errorMsg === "DUPLICATE_ID") {
          setError("이미 등록된 아이디입니다.");
          return;
        }
        if (errorMsg === "DUPLICATE_EMAIL") {
          setError("이미 등록된 이메일입니다.");
          return;
        }
      }
      console.log("Error post user:", error);
      setError("문제가 발생했습니다. 다시 시도해주세요.");
    },
  });

  const handleNextClick = () => {
    mutate(user);
  };
  return (
    <>
      <div className="w-full">
        <div className="text-center">
          <p className="pt-10 font-bold text-22">인증되었습니다!</p>
          <p className="mb-15 mt-15 text-16">아이디 : {user.id}</p>
          <p className="mb-15 mt-15 text-16">이메일 : {user.email}</p>
          {error && <p className="mt-10 text-red-500 text-14">{error}</p>}
        </div>
      </div>
      <div className="flex gap-10 mt-20 h-50">
        <PrevBtn onClick={onPrevLevel} />
        <NextBtn
          isLoading={isPending}
          onClick={handleNextClick}
          text="회원가입하기"
        />
      </div>
    </>
  );
};

export default FinalLevel;
