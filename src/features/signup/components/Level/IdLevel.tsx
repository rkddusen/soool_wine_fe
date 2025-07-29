// IdLevel.tsx
// 사용자의 아이디를 등록하기 위한 레벨
// 아이디 검증에 성공하면 PasswordLevel로 이동
import { useEffect, useState } from "react";
import { useIdExists } from "../../hooks/useIdExists";
import { SignUp } from "@/models/User";
import { UserIcon } from "@heroicons/react/24/outline";
import { AxiosError } from "axios";
import { useValidForm } from "@/hooks/useValidForm";
import NextBtn from "@/components/NextBtn";
import PrevBtn from "@/components/PrevBtn";

interface IdLevelProps {
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    name: keyof SignUp
  ) => void;
  onPrevLevel: () => void;
  onNextLevel: () => void;
}

const IdLevel = ({
  value,
  onChange,
  onPrevLevel,
  onNextLevel,
}: IdLevelProps) => {
  const [error, setError] = useState<string | null>(null);

  // error상태일 때 폼 변경 시 초기화
  useEffect(() => {
    if (error) setError(null);
  }, [value]);

  const { mutate, isPending } = useIdExists({
    onSuccess: (exists: boolean) => {
      if (exists) {
        setError("이미 존재하는 아이디입니다.");
      } else if (!exists) {
        onNextLevel();
      }
    },
    onError: (error: AxiosError) => {
      console.log("Error get id exists:", error);
      setError("문제가 발생했습니다. 다시 시도해주세요.");
    },
  });

  const { validId } = useValidForm();
  const handleNextClick = () => {
    const _error = validId(value);
    if (_error) {
      setError(_error);
      return;
    }
    mutate(value);
  };

  return (
    <>
      <div className="w-full">
        <div className="mt-15">
          <p className="font-bold text-20">아이디를 입력해주세요!</p>
          <p className="mt-10 text-14 text-(--gray-78)">
            4~16자의 영문, 숫자, -, _ 만 사용 가능합니다.
          </p>
          <div className="flex flex-row-reverse items-center w-full px-15 mt-10 h-50 rounded-5 border-(--gray-78) border focus-within:border-black focus-within:border-[1.5px]">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e, "id")}
              placeholder="아이디"
              className="w-full h-full mx-10 border-none outline-hidden peer"
            />
            <UserIcon className="w-20 h-20 shrink-0 peer-focus:stroke-black stroke-(--gray-bb)" />
          </div>
          {error && <p className="mt-10 text-red-500 text-14">{error}</p>}
        </div>
      </div>
      <div className="w-full flex gap-10 mt-20 h-50">
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

export default IdLevel;
