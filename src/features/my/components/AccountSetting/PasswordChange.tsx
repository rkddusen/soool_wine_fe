import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";
import { useToggle } from "@/hooks/useToggle";
import { usePasswordInputs } from "../../hooks/usePasswordInputs";
import { useValidForm } from "@/hooks/useValidForm";
import LoadingWhite from "/src/assets/LoadingWhite.svg?react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { AxiosError } from "axios";
import { usePatchPassword } from "../../hooks/usePatchPassword";

const PasswordChange = () => {
  const { isOpen, toggle } = useToggle();
  const [ref, { height }] = useMeasure();
  const { oldPassword, newPassword, newPasswordCheck, handlePasswordChange } =
    usePasswordInputs();
  const [oldPasswordError, setOldPasswordError] = useState<string | null>(null);
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [newPasswordCheckError, setNewPasswordCheckError] = useState<
    string | null
  >(null);

  // error상태일 때 폼 변경 시 초기화
  useEffect(() => {
    if (oldPasswordError) setOldPasswordError(null);
  }, [oldPassword]);
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
      } else if (oldPassword === newPassword) {
        setNewPasswordError("기존 비밀번호와 동일합니다.");
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

  const { mutate, isPending } = usePatchPassword({
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error: AxiosError) => {
      if (error.status === 400) {
        if (error.message === "WRONG_PASSWORD") {
          setOldPasswordError("비밀번호가 잘못됐습니다.");
          return;
        }
        if (error.message === "SAME_PASSWORD") {
          setNewPasswordError("기존 비밀번호와 동일합니다.");
          return;
        }
      }
      console.log("Error patch password:", error);
      setNewPasswordCheckError("문제가 발생했습니다. 다시 시도해주세요.");
    },
  });
  // 변경하기 버튼 클릭
  const handleChangeClick = () => {
    const error = validPassword(newPassword);
    if (error) {
      setNewPasswordError(error);
      return;
    }
    if (oldPassword === newPassword) {
      setNewPasswordError("기존 비밀번호와 동일합니다.");
      return;
    }
    if (newPassword !== newPasswordCheck) {
      setNewPasswordCheckError("새 비밀번호와 일치하지 않습니다.");
      return;
    }

    if (oldPassword && newPassword && newPasswordCheck) {
      mutate({ oldPassword, newPassword });
    }
  };

  return (
    <div className="border border-(--gray-e0) rounded-15 mt-20">
      <div
        onClick={toggle}
        className="flex justify-between items-center p-30 hover:cursor-pointer"
      >
        <div>
          <p className="font-medium">비밀번호 수정</p>
          <p className="mt-10 text-14">
            비밀번호는 영문과 숫자가 포함된 8~12자리입니다.
          </p>
        </div>
        {isOpen ? (
          <ChevronUpIcon className="w-24 h-24" />
        ) : (
          <ChevronDownIcon className="w-24 h-24" />
        )}
      </div>
      {/* 폼 영역 */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? height : 0 }}
        transition={{ duration: 0.2 }}
        style={{ overflow: "hidden" }}
      >
        <div ref={ref} className="p-30 border-t border-(--gray-e0)">
          {/* 기존 비밀번호 입력 폼 */}
          <div>
            <p className="font-medium">기존 비밀번호</p>
            <div className="w-full h-50 px-15 mt-10 border border-(--gray-78) focus-within:border-black rounded-5">
              <input
                type="password"
                value={oldPassword}
                onChange={handlePasswordChange}
                name="oldPassword"
                placeholder="기존 비밀번호"
                className="w-full h-full outline-hidden"
              />
            </div>
            {oldPasswordError && (
              <p className="mt-10 text-red-500 text-14">{oldPasswordError}</p>
            )}
          </div>
          {/* 새 비밀번호 입력 폼 */}
          <div>
            <div>
              <p className="font-medium mt-30">새 비밀번호</p>
              <div className="w-full h-50 px-15 mt-10 border border-(--gray-78) focus-within:border-black rounded-5">
                <input
                  type="password"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  onBlur={handleBlurPassword}
                  name="newPassword"
                  placeholder="새 비밀번호"
                  className="w-full h-full outline-hidden"
                />
              </div>
              {newPasswordError && (
                <p className="mt-10 text-red-500 text-14">{newPasswordError}</p>
              )}
            </div>
            <div>
              <div className="w-full h-50 px-15 mt-10 border border-(--gray-78) focus-within:border-black rounded-5">
                <input
                  type="password"
                  value={newPasswordCheck}
                  onChange={handlePasswordChange}
                  onBlur={handleBlurPassword}
                  name="newPasswordCheck"
                  placeholder="새 비밀번호 확인"
                  className="w-full h-full outline-hidden"
                />
              </div>
              {newPasswordCheckError && (
                <p className="mt-10 text-red-500 text-14">
                  {newPasswordCheckError}
                </p>
              )}
            </div>
          </div>
          <div className="text-end">
            <button
              onClick={handleChangeClick}
              disabled={
                isPending || !oldPassword || !newPassword || !newPasswordCheck
              }
              className={`mt-10 px-20 h-50 text-white rounded-5 text-14 ${
                oldPassword && newPassword && newPasswordCheck
                  ? "bg-(--gray-49) hover:cursor-pointer"
                  : "bg-(--gray-e0)"
              }`}
            >
              {isPending ? <LoadingWhite /> : "변경하기"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PasswordChange;
