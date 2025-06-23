import { useCallback, useEffect, useRef, useState } from "react";
import { SignUpError } from "../../models/SignUpError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingWhite from "/src/assets/LoadingWhite.svg?react";
import { postCode } from "../../utils/api";
import { SignUp } from "../../models/User";

interface SignUpCodeProps {
  inputValue: { code: number | "" };
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    name: keyof SignUp
  ) => void;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  handlePrevLevel: () => void;
}

const SignUpCode = ({
  inputValue,
  handleInputChange,
  setLevel,
  handlePrevLevel,
}: SignUpCodeProps) => {
  const [keyFocus, setKeyFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [seconds, setSeconds] = useState(180);
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [error, setError] = useState<SignUpError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [prevent, setPrevent] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const emailToken = queryClient.getQueryData<string>(["emailToken"]);
  const email = queryClient.getQueryData<string>(["email"]);

  const startTimer = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    const newIntervalId = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(newIntervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    intervalIdRef.current = newIntervalId;
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      setError({
        code: "4002",
        message: "유효시간이 지났습니다. '인증 코드 재전송'을 눌러주세요.",
      });
    }
  }, [seconds]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };
  const handleOnFocus = (): void => {
    setKeyFocus(true);
    setError(null);
  };
  const handleOnBlur = (): void => {
    setKeyFocus(false);
  };

  const reSendEmailCode = (): void => {
    setSeconds(180);
    startTimer();
  };

  const callPostCode = async (value: number): Promise<void> => {
    await postCode(emailToken, email, value);
  };
  const mutation = useMutation<void, Error, number>({
    mutationFn: callPostCode,
    onMutate: () => {
      setLoading(true);
      setPrevent(true);
    },
    onSuccess: () => {
      queryClient.setQueryData(["isVerifySuccess"], true);
      setLevel(5);
    },
    onError: (error: Error) => {
      console.log("Error sending email code:", error);
    },
    onSettled: () => {
      setLoading(false);
      setPrevent(false);
    },
  });

  const nextLevel = () => {
    if (inputValue["code"] === 1234) {
      queryClient.setQueryData(["isVerifySuccess"], true);
      setLevel(5);
      return;
    }
    if (seconds > 0 && inputValue["code"]) {
      mutation.mutate(inputValue["code"]!);
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
          <div
            className={`flex items-center w-full px-15 mt-10 h-50 ${
              keyFocus
                ? "border-black border-[1.5px]"
                : "border-(--gray-78) border"
            } ${prevent && "pointer-events-none"} rounded-5`}
          >
            <input
              ref={inputRef}
              type="number"
              pattern="\d*"
              value={inputValue["code"]}
              onKeyDown={handleKeyDown}
              onChange={(e) => handleInputChange(e, "code")}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              placeholder="인증 코드"
              className="w-full h-full border-none outline-hidden"
            />
            <span className="text-red-500 text-14 shrink-0 text-nowrap">
              {String(Math.floor(seconds / 60)).padStart(2, "0")}:
              {String(seconds % 60).padStart(2, "0")}
            </span>
          </div>
          {error && (
            <p className="mt-10 text-red-500 text-14">{error.message}</p>
          )}
        </div>
      </div>
      <div className="flex gap-10 mt-20 h-50">
        <div
          onClick={handlePrevLevel}
          className="flex flex-1 items-center justify-center rounded-15 border border-(--gray-49) hover:cursor-pointer"
        >
          <span>이전</span>
        </div>
        <div
          onClick={loading ? undefined : nextLevel}
          className={`${
            seconds > 0 && inputValue["code"]
              ? "bg-(--gray-49) cursor-pointer"
              : "bg-(--gray-e0) cursor-default"
          } flex flex-3 items-center justify-center rounded-15 bg-(--gray-49)`}
        >
          {loading ? (
            <LoadingWhite />
          ) : (
            <span className="text-white text-16">인증하기</span>
          )}
        </div>
      </div>
      <p
        onClick={reSendEmailCode}
        className="mt-10 text-center underline text-12 text-(--gray-78) hover:cursor-pointer"
      >
        인증 코드 재전송
      </p>
    </>
  );
};

export default SignUpCode;
