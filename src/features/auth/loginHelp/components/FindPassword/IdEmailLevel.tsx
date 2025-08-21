// IdEmailLevel.tsx
// 사용자의 이메일을 검증하기 위한 레벨
// 이메일 검증에 성공하면 CodeLevel로 이동
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EmailInput, IdInput, NextBtn, PrevBtn } from "@/components";
import { useValidForm } from "@/hooks/auth/useValidForm";
import { ApiErrorResponse } from "@/models/ApiError";
import { useFindPasswordEmailVerification } from "../../hooks/useFindPasswordEmailVerification";
import { useEmailCodeInputs, useIdInput } from "@/hooks/auth/useInputs";
import { useShowError } from "@/hooks/useShowError";
import { AUTH_ERROR_CODES } from "@/constants/ErrorCode/AuthErrorCode";

interface IdEmailLevelProps {
  onPrevLevel: () => void;
  onNextLevel: () => void;
}

const IdEmailLevel = ({ onPrevLevel, onNextLevel }: IdEmailLevelProps) => {
  const idInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { id, handleIdChange } = useIdInput();
  const { email, handleEmailChange, handleEmailSelect } = useEmailCodeInputs();
  const [idError, setIdError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  useQuery({
    queryKey: ["id"],
    queryFn: () => Promise.resolve(null),
    enabled: false,
    gcTime: Infinity,
  });
  useQuery({
    queryKey: ["email"],
    queryFn: () => Promise.resolve(null),
    enabled: false,
    gcTime: Infinity,
  });
  useQuery({
    queryKey: ["emailToken"],
    queryFn: () => Promise.resolve(null),
    enabled: false,
    gcTime: Infinity,
  });

  // 초기 렌더링 시 포커스
  useEffect(() => {
    idInputRef.current?.focus();
  }, []);

  // error상태일 때 폼 변경 시 초기화
  useEffect(() => {
    if (idError) setIdError(null);
    if (emailError) setEmailError(null);
  }, [id]);
  useEffect(() => {
    if (emailError) setEmailError(null);
  }, [email]);

  const { mutate, isPending } = useFindPasswordEmailVerification({
    onSuccess: (data: string) => {
      console.log("Email code sent successfully");
      queryClient.setQueryData(["emailToken"], data);
      queryClient.setQueryData(["id"], id);
      queryClient.setQueryData(["email"], email);
      onNextLevel();
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const { code, message } = useShowError(error, AUTH_ERROR_CODES);
      if (code === "INVALID_ID") {
        setIdError(message);
      } else if (code === "USER_EMAIL_MISMATCH") {
        setEmailError(message);
      } else {
        setEmailError(message);
      }
    },
  });

  const { validEmail } = useValidForm();
  const handleNextClick = () => {
    const _error = validEmail(email);
    if (_error) {
      setEmailError(_error);
    } else {
      mutate({ id, email });
    }
  };

  return (
    <>
      <div className="w-full mb-15">
        <div className="mb-15">
          <p className="font-bold text-20">
            등록하신 아이디와 이메일을 입력해주세요!
          </p>
          <IdInput
            ref={idInputRef}
            value={id}
            onChange={handleIdChange}
            placeholder="아이디"
          />
          {idError && <p className="text-red-500 text-14">{idError}</p>}
          <EmailInput
            ref={emailInputRef}
            value={email}
            onChange={handleEmailChange}
            onSelectEmail={handleEmailSelect}
            placeholder="이메일"
          />
          {emailError && <p className="text-red-500 text-14">{emailError}</p>}
        </div>
      </div>
      <div className="flex gap-10 mt-20 h-50">
        <PrevBtn onClick={onPrevLevel} />
        <NextBtn
          isLoading={isPending}
          onClick={handleNextClick}
          isActive={email !== "" && id !== ""}
          text="다음"
        />
      </div>
    </>
  );
};

export default IdEmailLevel;
