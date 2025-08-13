// PasswordLevel.tsx
// 사용자의 비밀번호를 등록하기 위한 레벨
// 비밀번호 검증에 성공하면 EmailLevel로 이동
import { useEffect, useRef, useState } from "react";
import { SignUp } from "@/models/User";
import { useValidForm } from "@/hooks/useValidForm";
import { PasswordInput, NextBtn, PrevBtn } from "@/components";

interface PasswordLevelProps {
  value: string;
  onChange: (
    name: keyof SignUp
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPrevLevel: () => void;
  onNextLevel: () => void;
}

const PasswordLevel = ({
  value,
  onChange,
  onPrevLevel,
  onNextLevel,
}: PasswordLevelProps) => {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  // 초기 렌더링 시 포커스
  useEffect(() => {
    passwordInputRef.current?.focus();
  }, []);

  // error상태일 때 폼 변경 시 초기화
  useEffect(() => {
    if (error) setError(null);
  }, [value]);

  const { validPassword } = useValidForm();
  const handleNextClick = () => {
    const _error = validPassword(value);
    if (_error) {
      setError(_error);
    } else {
      onNextLevel();
    }
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
      <div className="w-full mb-15">
        <div className="mb-15">
          <p className="mb-10 font-bold text-20">비밀번호를 입력해주세요!</p>
          <p className="mb-10 text-14 text-(--gray-78)">
            8~16자의 영문, 숫자, 특수문자를 조합하여 사용 가능합니다.
          </p>
          <PasswordInput
            ref={passwordInputRef}
            value={value}
            onChange={onChange("password")}
            onKeyDown={handleKeyDownEnter}
            placeholder="비밀번호"
          />
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
