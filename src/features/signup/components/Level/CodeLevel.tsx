// CodeLevel.tsx
// 사용자의 이메일로 보낸 코드를 확인하기 위한 레벨
// 코드는 3분안에 입력해야 하며, 코드 검증에 성공하면 FinalLevel로 이동
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/models/User";
import { useCode } from "../../hooks/useCode";
import { AxiosError } from "axios";
import { useCodeTimer } from "../../hooks/useCodeTimer";
import { useEmail } from "../../hooks/useEmail";
import NextBtn from "@/components/NextBtn";
import PrevBtn from "@/components/PrevBtn";

interface CodeLevelProps {
  value: number | "";
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    name: keyof User
  ) => void;
  onPrevLevel: () => void;
  onNextLevel: () => void;
}

const CodeLevel = ({
  value,
  onChange,
  onPrevLevel,
  onNextLevel,
}: CodeLevelProps) => {
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const email: string | undefined = queryClient.getQueryData(["email"]);

  // error상태일 때 폼 변경 시 초기화
  useEffect(() => {
    if (error) setError(null);
  }, [value]);

  const { seconds, reset } = useCodeTimer();

  useEffect(() => {
    if (seconds === 0) {
      setError("유효시간이 지났습니다. '인증 코드 재전송'을 눌러주세요.");
    }
  }, [seconds]);

  // 숫자 input특성 상 지수 표기법이나 +/- 기호가 허용되기 때문에 이를 막음
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const { mutate, isPending } = useCode({
    onSuccess: () => {
      queryClient.setQueryData(["isVerifySuccess"], true);
      onNextLevel();
    },
    onError: (error: AxiosError) => {
      // 인증 코드가 잘못된 경우
      if (error.status === 400) {
        setError("올바른 인증 코드가 아닙니다.");
        return;
      }
      console.log("Error post code:", error);
      setError("문제가 발생했습니다. 다시 시도해주세요.");
    },
  });

  const handleNextClick = () => {
    const token = queryClient.getQueryData<string>(["emailToken"]);

    if (!token || !email) {
      setError("문제가 발생했습니다. 다시 시도해주세요.");
      return;
    }
    if (seconds > 0 && value && !isNaN(Number(value))) {
      mutate({ code: value, token, email });
    }
  };

  // 인증 코드 재전송
  const { mutate: emailMutation, isPending: emailIsPending } = useEmail({
    onSuccess: (data: string) => {
      console.log("Email code sent successfully");
      queryClient.setQueryData(["emailToken"], data);
      setError(null);
      reset();
    },
    onError: (error: AxiosError) => {
      console.log("Error post email:", error);
      setError("문제가 발생했습니다. 다시 시도해주세요.");
    },
  });
  const handleReSend = () => {
    if (email === undefined) {
      setError("문제가 발생했습니다. 다시 시도해주세요.");
      return;
    }
    emailMutation(email);
  };

  return (
    <>
      <div className="w-full">
        <div className="mt-15">
          <p className="font-bold text-20">이메일로 인증 코드를 보냈어요!</p>
          <p className="mt-10 text-(--gray-78) text-14">
            인증 코드를 입력해주세요.
          </p>
          <div className="flex items-center w-full px-15 mt-10 h-50 rounded-5 border-(--gray-78) border focus-within:border-black focus-within:border-[1.5px]">
            <input
              type="number"
              pattern="\d*"
              value={value}
              onKeyDown={handleKeyDown}
              onChange={(e) => onChange(e, "code")}
              placeholder="인증 코드 6자리"
              className="w-full h-full border-none outline-hidden"
            />
            <span className="text-red-500 text-14 shrink-0 text-nowrap">
              {String(Math.floor(seconds / 60)).padStart(2, "0")}:
              {String(seconds % 60).padStart(2, "0")}
            </span>
          </div>
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
