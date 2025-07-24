// PasswordLevel.tsx
// 사용자의 비밀번호를 등록하기 위한 레벨
// 비밀번호 검증에 성공하면 EmailLevel로 이동
import { useEffect, useState } from "react";
import { User } from "@/models/User";
import {
  LockClosedIcon,
  EyeSlashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { useValidForm } from "../../hooks/useValidForm";
import NextBtn from "@/components/NextBtn";
import PrevBtn from "@/components/PrevBtn";

interface PasswordLevelProps {
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    name: keyof User
  ) => void;
  onPrevLevel: () => void;
  onNextLevel: () => void;
}

const PasswordLevel = ({
  value,
  onChange,
  onPrevLevel,
  onNextLevel,
}: PasswordLevelProps) => {
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // error상태일 때 폼 변경 시 초기화
  useEffect(() => {
    if (error) setError(null);
  }, [value]);

  const handleSeePassword = (): void => {
    setSeePassword((prev) => !prev);
  };

  const { validPassword } = useValidForm();
  const handleNextClick = () => {
    const _error = validPassword(value);
    if (_error) {
      setError(_error);
    } else {
      onNextLevel();
    }
  };

  return (
    <>
      <div className="w-full mb-15">
        <div className="mb-15">
          <p className="mb-10 font-bold text-20">비밀번호를 입력해주세요!</p>
          <p className="mb-10 text-14 text-(--gray-78)">
            8~16자의 영문, 숫자, 특수문자를 조합하여 사용 가능합니다.
          </p>
          <div className="flex flex-row-reverse items-center w-full px-15 h-50 rounded-5 border-(--gray-78) border focus-within:border-black focus-within:border-[1.5px]">
            {seePassword ? (
              <EyeIcon
                onClick={handleSeePassword}
                className="w-20 h-20 hover:cursor-pointer"
              />
            ) : (
              <EyeSlashIcon
                onClick={handleSeePassword}
                className="w-20 h-20 hover:cursor-pointer stroke-(--gray-bb)"
              />
            )}
            <input
              type={seePassword ? "text" : "password"}
              value={value}
              onChange={(e) => onChange(e, "password")}
              placeholder="비밀번호"
              className="w-full h-full ml-10 border-none outline-hidden peer"
            />
            <LockClosedIcon className="w-20 h-20 shrink-0 peer-focus:stroke-black stroke-(--gray-bb)" />
          </div>
          {error && <p className="mt-10 text-red-500 text-14">{error}</p>}
        </div>
      </div>
      <div className="flex gap-10 mt-20 h-50">
        <PrevBtn onClick={onPrevLevel} />
        <NextBtn
          onClick={handleNextClick}
          isActive={value !== ""}
          text="다음"
        />
      </div>
    </>
  );
};

export default PasswordLevel;
