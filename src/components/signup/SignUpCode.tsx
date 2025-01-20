import { useCallback, useEffect, useRef, useState } from "react";

const inputNames = ["key"] as const;
type InputName = (typeof inputNames)[number];

interface SignUpCodeComponentProps {
  inputValue: Record<InputName, string>;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    name: InputName
  ) => void;
}

const SignUpCode = ({
  inputValue,
  handleInputChange,
}: SignUpCodeComponentProps) => {
  const [keyFocus, setKeyFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [seconds, setSeconds] = useState(180);
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
      // 시간 초과
    }
  }, [seconds]);

  const handleOnFocus = (): void => {
    setKeyFocus(true);
  };
  const handleOnBlur = (): void => {
    setKeyFocus(false);
  };

  const reSendEmailCode = (): void => {
    setSeconds(180);
    startTimer();
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
            } rounded-5`}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue["key"]}
              onChange={(e) => handleInputChange(e, "key")}
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
        </div>
      </div>
      <div className="flex flex-row items-center justify-center w-full mt-15 h-50 rounded-15 bg-49-gray hover:cursor-pointer">
        <span className="text-white text-16">회원가입하기</span>
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
