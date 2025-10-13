// FindId/EmailLevel.tsx
// 사용자의 이메일을 검증하기 위한 레벨
// 이메일 검증에 성공하면 CodeLevel로 이동
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EmailInput, NextBtn, PrevBtn } from "@/components";
import { useValidForm } from "@/features/shared/Auth/hooks/useValidForm";
import { useFindIdEmailVerification } from "../../hooks/useFindIdEmailVerification";
import { useShowError } from "@/hooks/useShowError";
import { ApiErrorResponse } from "@/models/ApiError";
import { AUTH_ERROR_CODES } from "@/constants/ErrorCode/AuthErrorCode";

interface EmailLevelProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectEmail: (email: string) => void;
  onPrevLevel: () => void;
  onNextLevel: () => void;
}

const EmailLevel = ({
  value,
  onChange,
  onSelectEmail,
  onPrevLevel,
  onNextLevel,
}: EmailLevelProps) => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
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
    emailInputRef.current?.focus();
  }, []);

  // error상태일 때 폼 변경 시 초기화
  useEffect(() => {
    if (error) setError(null);
  }, [value]);

  const { mutate, isPending } = useFindIdEmailVerification({
    onSuccess: (data: string) => {
      console.log("Email code sent successfully");
      queryClient.setQueryData(["emailToken"], data);
      queryClient.setQueryData(["email"], value);
      onNextLevel();
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const { message } = useShowError(error, AUTH_ERROR_CODES);
      setError(message);
    },
  });

  const { validEmail } = useValidForm();
  const handleNextClick = () => {
    const _error = validEmail(value);
    if (_error) {
      setError(_error);
    } else {
      mutate(value);
    }
  };

  return (
    <>
      <div className="w-full mb-15">
        <div className="mb-15">
          <p className="font-bold text-20">등록하신 이메일을 입력해주세요!</p>
          <EmailInput
            ref={emailInputRef}
            value={value}
            onChange={onChange}
            onSelectEmail={onSelectEmail}
            placeholder="이메일"
          />
          {error && <p className="text-red-500 text-14">{error}</p>}
        </div>
      </div>
      <div className="flex gap-10 mt-20 h-50">
        <PrevBtn onClick={onPrevLevel} />
        <NextBtn
          isLoading={isPending}
          onClick={handleNextClick}
          isActive={value !== ""}
          text="다음"
        />
      </div>
    </>
  );
};

export default EmailLevel;
