// PasswordLevel.tsx
// 사용자의 비밀번호를 등록하기 위한 레벨
// 비밀번호 검증에 성공하면 EmailLevel로 이동
import { useRef, useState } from "react";
import { validPassword } from "@/utils/signUpValidators";
import { SignUpError } from "@/models/SignUpError";
import { User } from "@/models/User";
import {
  LockClosedIcon,
  EyeSlashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

interface Props {
  inputValue: { password: string };
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    name: keyof User
  ) => void;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  handlePrevLevel: () => void;
}

const PasswordLevel = ({
  inputValue,
  handleInputChange,
  setLevel,
  handlePrevLevel,
}: Props) => {
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [error, setError] = useState<SignUpError | null>(null);

  const handleOnFocus = (): void => {
    setPasswordFocus(true);
    setError(null);
  };
  const handleOnBlur = (): void => {
    setPasswordFocus(false);
  };

  const handleSeePassword = (): void => {
    setSeePassword((prev) => !prev);
  };

  const nextLevel = () => {
    const _error = validPassword(inputValue["password"]);
    if (_error) {
      setError(_error);
    } else {
      setLevel(3);
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
          <div
            className={`flex items-center w-full px-15 h-50 ${
              passwordFocus
                ? "border-black border-[1.5px]"
                : "border-(--gray-78) border"
            } rounded-5`}
          >
            <LockClosedIcon
              className={`w-20 h-20 shrink-0 ${
                passwordFocus ? "stroke-black" : "stroke-(--gray-bb)"
              }`}
            />
            <input
              ref={passwordRef}
              type={seePassword ? "text" : "password"}
              value={inputValue["password"]}
              onChange={(e) => handleInputChange(e, "password")}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              placeholder="비밀번호"
              className="w-full h-full ml-10 border-none outline-hidden"
            />
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
          onClick={nextLevel}
          className="flex flex-3 items-center justify-center rounded-15 bg-(--gray-49) hover:cursor-pointer"
        >
          <span className="text-white">다음</span>
        </div>
      </div>
    </>
  );
};

export default PasswordLevel;
