// EmailLevel.tsx
// 사용자의 이메일을 등록하기 위한 레벨
// 이메일 검증에 성공하면 CodeLevel로 이동
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SignUp } from "@/models/User";
import { AxiosError } from "axios";
import { useEmailVerification } from "@/hooks/useEmailVerification";
import { useAutoEmail } from "../../hooks/useAutoEmail";
import { useValidForm } from "@/hooks/useValidForm";
import NextBtn from "@/components/NextBtn";
import PrevBtn from "@/components/PrevBtn";

interface EmailLevelProps {
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    name: keyof SignUp
  ) => void;
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

  // error상태일 때 폼 변경 시 초기화
  useEffect(() => {
    if (error) setError(null);
  }, [value]);

  const { addressList } = useAutoEmail(value);

  const { mutate, isPending } = useEmailVerification({
    onSuccess: (data: string) => {
      console.log("Email code sent successfully");
      queryClient.setQueryData(["emailToken"], data);
      queryClient.setQueryData(["email"], value);
      onNextLevel();
    },
    onError: (error: AxiosError) => {
      if (error.status === 409) {
        setError("이미 등록된 이메일입니다.");
      } else {
        console.log("Error post email:", error);
        setError("문제가 발생했습니다. 다시 시도해주세요.");
      }
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
          <p className="mb-10 font-bold text-20">이메일을 입력해주세요!</p>
          <div className="relative w-full">
            <div className="px-15 h-50 rounded-5 border-(--gray-78) border focus-within:border-black focus-within:border-[1.5px] peer">
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e, "email")}
                placeholder="이메일"
                className="w-full h-full border-none outline-hidden"
              />
            </div>
            <ul
              className={`absolute w-full bg-white z-1 max-h-100 overflow-y-auto shadow-(--shadow-base) ${
                addressList.length !== 0
                  ? "peer-focus-within:block hidden"
                  : "hidden"
              }`}
            >
              {addressList.map((v) => (
                <li
                  key={v}
                  onMouseDown={() => {
                    onSelectEmail(v);
                  }}
                  className="p-12 hover:cursor-pointer hover:bg-(--gray-f0) text-14"
                >
                  {v}
                </li>
              ))}
            </ul>
          </div>
          {error && <p className="mt-10 text-red-500 text-14">{error}</p>}
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
