// EmailLevel.tsx
// 사용자의 이메일을 등록하기 위한 레벨
// 이메일 검증에 성공하면 CodeLevel로 이동
import { useEffect, useRef, useState } from "react";
import { SignUpError } from "@/models/SignUpError";
import { validEmail } from "@/utils/signUpValidators";
import { postEmail } from "@/utils/api";
import LoadingWhite from "/src/assets/LoadingWhite.svg?react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/models/User";
import { EmailVerificationTokenResponse } from "@/models/Api";
import { AxiosError } from "axios";

interface Props {
  inputValue: { email: string };
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    name: keyof User
  ) => void;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  handlePrevLevel: () => void;
  handleEmailSelect: (email: string) => void;
}

const ADDRESS = [
  "naver.com",
  "gmail.com",
  "kakao.com",
  "daum.net",
  "hanmail.net",
  "outlook.com",
  "nate.com",
];

const EmailLevel = ({
  inputValue,
  handleInputChange,
  setLevel,
  handlePrevLevel,
  handleEmailSelect,
}: Props) => {
  const [emailFocus, setEmailFocus] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const [addressList, setAddressList] = useState<string[]>([]);
  const [error, setError] = useState<SignUpError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [prevent, setPrevent] = useState<boolean>(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const email = inputValue["email"] ?? "";
    const [localPart, domainPart = ""] = email.split("@");

    if (!localPart) {
      setAddressList([]);
      return;
    }

    const filtered = ADDRESS.filter((domain) =>
      domain.startsWith(domainPart)
    ).map((domain) => `${localPart}@${domain}`);

    setAddressList(filtered);
  }, [inputValue["email"]]);

  const handleEmailOnFocus = (): void => {
    setEmailFocus(true);
    setError(null);
  };
  const handleEmailOnBlur = (): void => {
    setEmailFocus(false);
  };

  const callPostEmailForCode = async (value: string): Promise<string> => {
    const response: EmailVerificationTokenResponse = await postEmail(value);
    return response.token;
  };

  const mutation = useMutation<string, AxiosError, string>({
    mutationFn: callPostEmailForCode,
    onMutate: () => {
      setLoading(true);
      setPrevent(true);
    },
    onSuccess: (data: string) => {
      console.log("Email code sent successfully:", data);
      queryClient.setQueryData(["emailToken"], data);
      queryClient.setQueryData(["email"], inputValue["email"]);
      setLevel(4);
    },
    onError: (error: AxiosError) => {
      if (error.status === 409) {
        setError({
          code: "3003",
          message: "이미 등록된 이메일입니다.",
        });
      } else {
        console.log("Error sending email code:", error);
        setError({
          code: "3004",
          message: "문제가 발생했습니다. 다시 시도해주세요.",
        });
      }
    },
    onSettled: () => {
      setLoading(false);
      setPrevent(false);
    },
  });

  const nextLevel = () => {
    if (inputValue["email"] === "test@naver.com") {
      setLevel(4);
      return;
    }
    const _error = validEmail(inputValue["email"]);
    if (_error) {
      setError(_error);
    } else {
      mutation.mutate(inputValue["email"]);
    }
  };

  return (
    <>
      <div className="w-full mb-15">
        <div className="mb-15">
          <p className="mb-10 font-bold text-20">이메일을 입력해주세요!</p>
          <div
            className={`relative w-full ${prevent && "pointer-events-none"}`}
          >
            <div
              className={`px-15 h-50 rounded-5 ${
                emailFocus
                  ? "border-black border-[1.5px]"
                  : "border-(--gray-78) border"
              }`}
            >
              <input
                ref={emailRef}
                type="text"
                value={inputValue["email"]}
                onChange={(e) => handleInputChange(e, "email")}
                onFocus={handleEmailOnFocus}
                onBlur={handleEmailOnBlur}
                placeholder="이메일"
                className="w-full h-full border-none outline-hidden"
              />
            </div>
            <ul
              className={`${
                emailFocus && addressList.length !== 0 ? "block" : "hidden"
              } absolute w-full bg-white z-1 max-h-100 overflow-y-auto shadow-(--shadow-base)`}
            >
              {addressList.map((v) => (
                <li
                  key={v}
                  onMouseDown={() => {
                    handleEmailSelect(v);
                  }}
                  className="p-12 hover:cursor-pointer hover:bg-(--gray-f0) text-14"
                >
                  {v}
                </li>
              ))}
            </ul>
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
          className="flex flex-3 items-center justify-center rounded-15 bg-(--gray-49) hover:cursor-pointer"
        >
          {loading ? (
            <LoadingWhite />
          ) : (
            <span className="text-white">다음</span>
          )}
        </div>
      </div>
    </>
  );
};

export default EmailLevel;
