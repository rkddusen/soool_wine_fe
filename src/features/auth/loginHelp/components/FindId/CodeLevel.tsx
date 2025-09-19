// FindId/CodeLevel.tsx
// 사용자의 이메일로 보낸 코드를 확인하기 위한 레벨
// 코드는 3분안에 입력해야 하며, 코드 검증에 성공하면 아이디를 반환
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CodeInput, NextBtn, PrevBtn } from "@/components";
import { useFindIdEmailVerification } from "../../hooks/useFindIdEmailVerification";
import { useFindIdVerify } from "../../hooks/useFindIdVerify";
import { useCodeTimer } from "@/hooks/auth/useCodeTimer";
import { useShowError } from "@/hooks/useShowError";
import { ApiErrorResponse } from "@/models/ApiError";
import { AUTH_ERROR_CODES } from "@/constants/ErrorCode/AuthErrorCode";

interface CodeLevelProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPrevLevel: () => void;
  onNextLevel: () => void;
  onFoundId: (id: string) => void;
}

const CodeLevel = ({
  value,
  onChange,
  onPrevLevel,
  onNextLevel,
  onFoundId,
}: CodeLevelProps) => {
  const codeInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const email: string | undefined = queryClient.getQueryData(["email"]);

  // 초기 렌더링 시 포커스
  useEffect(() => {
    codeInputRef.current?.focus();
  }, []);

  // error상태일 때 폼 변경 시 초기화
  useEffect(() => {
    if (error) setError(null);
  }, [value]);

  const { seconds, reset } = useCodeTimer(true);

  useEffect(() => {
    if (seconds === 0) {
      setError("유효시간이 지났습니다. '인증 코드 재전송'을 눌러주세요.");
    }
  }, [seconds]);

  const { mutate, isPending } = useFindIdVerify({
    onSuccess: (id: string) => {
      onFoundId(id);
      onNextLevel();
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const { message } = useShowError(error, AUTH_ERROR_CODES);
      setError(message);
    },
  });

  const handleNextClick = () => {
    const token = queryClient.getQueryData<string>(["emailToken"]);

    if (!token || !email) {
      setError("문제가 발생했습니다. 다시 시도해주세요.");
      return;
    }
    if (seconds > 0 && value && !isNaN(Number(value))) {
      mutate({ token, email, code: value });
    }
  };

  // 인증 코드 재전송
  const { mutate: emailMutation, isPending: emailIsPending } =
    useFindIdEmailVerification({
      onSuccess: (data: string) => {
        console.log("Email code sent successfully");
        queryClient.setQueryData(["emailToken"], data);
        setError(null);
        reset();
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
        const { message } = useShowError(error, AUTH_ERROR_CODES);
        setError(message);
      },
    });
  const handleReSend = () => {
    if (email === undefined) {
      setError("문제가 발생했습니다. 다시 시도해주세요.");
      return;
    }
    emailMutation(email);
  };

  // 각 입력 폼에서 "Enter"키를 눌렀을 때 넘어가기
  const handleKeyDownEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const _key = event.key;
    if (_key === "Enter") {
      handleNextClick();
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="mt-15">
          <p className="font-bold text-20">이메일로 인증 코드를 보냈어요!</p>
          <p className="mt-10 text-(--gray-78) text-14">
            인증 코드를 입력해주세요.
          </p>
          <CodeInput
            ref={codeInputRef}
            value={value}
            onChange={onChange}
            handleKeyDownEnter={handleKeyDownEnter}
            placeholder="인증 코드 6자리"
            seconds={seconds}
          />
          {error && <p className="mt-10 text-red-500 text-14">{error}</p>}
        </div>
      </div>
      <div className="flex gap-10 mt-20 h-50">
        <PrevBtn onClick={onPrevLevel} />
        <NextBtn
          isLoading={isPending || emailIsPending}
          onClick={handleNextClick}
          isActive={seconds > 0 && value !== ""}
          text="인증하기"
        />
      </div>
      <p
        onClick={handleReSend}
        className="mt-10 text-center underline text-12 text-(--gray-78) hover:cursor-pointer"
      >
        인증 코드 재전송
      </p>
    </>
  );
};

export default CodeLevel;
