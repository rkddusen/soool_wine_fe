// Level/IdLevel.tsx
// 사용자의 아이디를 등록하기 위한 레벨
// 아이디 검증에 성공하면 PasswordLevel로 이동
import { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import { IdInput, NextBtn, PrevBtn } from "@/components";
import { useIdExists } from "../../hooks/useIdExists";
import { useValidForm } from "@/features/Auth/hooks/useValidForm";

interface IdLevelProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPrevLevel: () => void;
  onNextLevel: () => void;
}

const IdLevel = ({
  value,
  onChange,
  onPrevLevel,
  onNextLevel,
}: IdLevelProps) => {
  const idInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  // 초기 렌더링 시 포커스
  useEffect(() => {
    idInputRef.current?.focus();
  }, []);

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

  // 각 입력 폼에서 "Enter"키를 눌렀을 때 넘어가기
  const handleKeyDownEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const _key = event.key;
    if (_key === "Enter") {
      // input에서 한글을 입력할 때 마지막 글자가 중복되는 현상 방지
      if (event.nativeEvent.isComposing) {
        return;
      }
      handleNextClick();
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="mt-15">
          <p className="font-bold text-20">아이디를 입력해주세요!</p>
          <p className="mt-10 text-14 text-(--gray-78)">
            4~16자의 영문, 숫자, -, _ 만 사용 가능합니다.
          </p>
          <IdInput
            ref={idInputRef}
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDownEnter}
            placeholder="아이디"
          />
          {error && <p className="text-red-500 text-14">{error}</p>}
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
