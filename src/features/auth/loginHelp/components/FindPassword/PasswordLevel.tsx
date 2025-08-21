import { useEffect, useRef, useState } from "react";
import { usePasswordInput } from "@/hooks/auth/useInputs";
import { useValidForm } from "@/hooks/auth/useValidForm";
import { AxiosError } from "axios";
import { useFindPasswordReset } from "../../hooks/useFindPasswordReset";
import { NextBtn, PasswordInput, PrevBtn } from "@/components";
import { useQueryClient } from "@tanstack/react-query";
import { ApiErrorResponse } from "@/models/ApiError";
import { AUTH_ERROR_CODES } from "@/constants/ErrorCode/AuthErrorCode";
import { useShowError } from "@/hooks/useShowError";

interface PasswordLevelProps {
  onPrevLevel: () => void;
  onNextLevel: () => void;
}

const PasswordLevel = ({ onPrevLevel, onNextLevel }: PasswordLevelProps) => {
  const newPasswordInputRef = useRef<HTMLInputElement | null>(null);
  const newPasswordCheckInputRef = useRef<HTMLInputElement | null>(null);
  const {
    password: newPassword,
    handlePasswordChange: handleNewPasswordChange,
  } = usePasswordInput();
  const {
    password: newPasswordCheck,
    handlePasswordChange: handleNewPasswordCheckChange,
  } = usePasswordInput();
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [newPasswordCheckError, setNewPasswordCheckError] = useState<
    string | null
  >(null);

  // error상태일 때 폼 변경 시 초기화
  useEffect(() => {
    if (newPasswordError) setNewPasswordError(null);
  }, [newPassword]);
  useEffect(() => {
    if (newPasswordCheckError) setNewPasswordCheckError(null);
  }, [newPasswordCheck]);

  const { validPassword } = useValidForm();
  // 비밀번호 블러 이벤트 핸들러
  const handleBlurPassword = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (name === "newPassword") {
      const error = validPassword(newPassword);
      if (error) {
        setNewPasswordError(error);
      }
      if (newPassword === newPasswordCheck) {
        setNewPasswordCheckError(null);
      }
    } else if (name === "newPasswordCheck") {
      if (newPassword !== newPasswordCheck) {
        setNewPasswordCheckError("새 비밀번호와 일치하지 않습니다.");
      }
    }
  };

  const { mutate, isPending } = useFindPasswordReset({
    onSuccess: () => {
      onNextLevel();
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const { message } = useShowError(error, AUTH_ERROR_CODES);
      setNewPasswordError(message);
    },
  });

  const queryClient = useQueryClient();
  const id: string | undefined = queryClient.getQueryData(["id"]);
  // 변경하기 버튼 클릭
  const handleChangeClick = () => {
    const error = validPassword(newPassword);
    if (error) {
      setNewPasswordError(error);
      return;
    }
    if (newPassword !== newPasswordCheck) {
      setNewPasswordCheckError("새 비밀번호와 일치하지 않습니다.");
      return;
    }

    if (id && newPassword && newPasswordCheck) {
      mutate({ id, newPassword });
    }
  };

  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (e.currentTarget.name === "newPassword") {
        newPasswordInputRef.current?.blur();
        newPasswordCheckInputRef.current?.focus();
      } else if (e.currentTarget.name === "newPasswordCheck") {
        newPasswordCheckInputRef.current?.blur();
        handleChangeClick();
      }
    }
  };

  return (
    <>
      <div className="w-full mb-15">
        <div className="mb-15">
          <p className="font-bold text-20">
            등록하신 아이디와 이메일을 입력해주세요!
          </p>
          <PasswordInput
            ref={newPasswordInputRef}
            value={newPassword}
            onChange={handleNewPasswordChange}
            onKeyDown={handleKeyDownEnter}
            onBlur={handleBlurPassword}
            placeholder="새 비밀번호"
          />
          {newPasswordError && (
            <p className="text-red-500 text-14">{newPasswordError}</p>
          )}
          <PasswordInput
            ref={newPasswordCheckInputRef}
            value={newPasswordCheck}
            onChange={handleNewPasswordCheckChange}
            onKeyDown={handleKeyDownEnter}
            onBlur={handleBlurPassword}
            placeholder="새 비밀번호"
          />
          {newPasswordCheckError && (
            <p className="text-red-500 text-14">{newPasswordCheckError}</p>
          )}
        </div>
      </div>
      <div className="flex gap-10 mt-20 h-50">
        <PrevBtn onClick={onPrevLevel} />
        <NextBtn
          isLoading={isPending}
          onClick={onNextLevel}
          isActive={newPassword !== "" && newPasswordCheck !== ""}
          text="다음"
        />
      </div>
    </>
  );
};

export default PasswordLevel;
