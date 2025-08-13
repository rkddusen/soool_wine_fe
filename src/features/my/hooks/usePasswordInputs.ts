/**
 * features/my/hooks/usePasswordInputs.ts
 * 비밀번호 입력 상태를 관리하는 커스텀 훅
 * - 기존 비밀번호, 새 비밀번호, 새 비밀번호 확인 입력 상태를 관리하고, 입력 변경 핸들러를 반환
 */
import { useRef, useState } from "react";

export const usePasswordInputs = () => {
  const oldPasswordInputRef = useRef<HTMLInputElement | null>(null);
  const newPasswordInputRef = useRef<HTMLInputElement | null>(null);
  const newPasswordCheckInputRef = useRef<HTMLInputElement | null>(null);

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordCheck, setNewPasswordCheck] = useState<string>("");

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "oldPassword") {
      setOldPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "newPasswordCheck") {
      setNewPasswordCheck(value);
    }
  };

  return {
    oldPasswordInputRef,
    newPasswordInputRef,
    newPasswordCheckInputRef,
    oldPassword,
    newPassword,
    newPasswordCheck,
    handlePasswordChange,
  };
};
