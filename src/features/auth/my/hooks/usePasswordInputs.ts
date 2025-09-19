/**
 * features/Auth/My/hooks/usePasswordInputs.ts
 * 비밀번호 입력 상태를 관리하는 커스텀 훅
 * - 기존 비밀번호, 새 비밀번호, 새 비밀번호 확인 입력 상태를 관리하고, 입력 변경 핸들러를 반환
 */
import { useRef } from "react";
import { usePasswordInput } from "@/hooks/auth/useInputs";

export const usePasswordInputs = () => {
  const oldPasswordInputRef = useRef<HTMLInputElement | null>(null);
  const newPasswordInputRef = useRef<HTMLInputElement | null>(null);
  const newPasswordCheckInputRef = useRef<HTMLInputElement | null>(null);

  const {
    password: oldPassword,
    handlePasswordChange: handleOldPasswordChange,
  } = usePasswordInput();
  const {
    password: newPassword,
    handlePasswordChange: handleNewPasswordChange,
  } = usePasswordInput();
  const {
    password: newPasswordCheck,
    handlePasswordChange: handleNewPasswordCheckChange,
  } = usePasswordInput();

  return {
    oldPasswordInputRef,
    newPasswordInputRef,
    newPasswordCheckInputRef,
    oldPassword,
    newPassword,
    newPasswordCheck,
    handleOldPasswordChange,
    handleNewPasswordChange,
    handleNewPasswordCheckChange,
  };
};
