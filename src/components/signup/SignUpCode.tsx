import { useCallback, useEffect, useRef, useState } from "react";
import { SignUpError } from "../../models/SignUpError";
import { EmailApiResponse } from "../../models/Api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "/src/assets/loading.svg?react";
import { AxiosResponse } from "axios";
import { postCode } from "../../utils/api";
// import { validCode } from "../../utils/signUpValidators";
import { SignUp } from "../../models/\bUser";

interface SignUpCodeComponentProps {
  inputValue: { code: number | "" };
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    name: keyof SignUp
  ) => void;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
}

const SignUpCode = ({
  inputValue,
  handleInputChange,
  setLevel,
}: SignUpCodeComponentProps) => {
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

  const callPostCode = async (value: number): Promise<EmailApiResponse> => {
    const response: AxiosResponse<EmailApiResponse> = await postCode(
      emailToken,
      email,
      value
    );
    return response.data;
  };
  const mutation = useMutation<EmailApiResponse, Error, number>({
    mutationFn: callPostCode,
    onMutate: () => {
      setLoading(true);
      setPrevent(true);
    },
    onSuccess: (data: EmailApiResponse) => {
      console.log("Email code sent successfully:", data);
      queryClient.setQueryData(["isSignUpSuccess"], true);
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
    if (seconds > 0 && inputValue["code"]) {
      mutation.mutate(inputValue["code"]!);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="mt-15">
          <p className="font-bold text-20">이메일로 인증 코드를 보냈어요!</p>
          <p className="mt-10 text-78-gray text-14">
            인증 코드를 입력해주세요.
          </p>
          <div
            className={`flex items-center w-full px-15 mt-10 h-50 ${
              keyFocus ? "border-black border-1.5" : "border-78-gray border"
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
              className="w-full h-full border-none outline-none"
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
      <div
        onClick={loading ? undefined : nextLevel}
        className={`${
          seconds > 0 && inputValue["code"]
            ? "bg-49-gray cursor-pointer"
            : "bg-e0-gray cursor-default"
        } flex flex-row items-center justify-center w-full mt-15 h-50 rounded-15 bg-49-gray`}
      >
        {loading ? (
          <Loading />
        ) : (
          <span className="text-white text-16">회원가입하기</span>
        )}
      </div>
      <p
        onClick={reSendEmailCode}
        className="mt-10 text-center underline text-12 text-78-gray hover:cursor-pointer"
      >
        인증 코드 재전송
      </p>
    </>
  );
};

export default SignUpCode;
