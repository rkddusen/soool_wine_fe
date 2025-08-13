import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";
import { useAuthStore } from "@/stores/authStore";
import { useToggle } from "@/hooks/useToggle";
import { useCodeTimer } from "@/hooks/useCodeTimer";
import { useValidForm } from "@/hooks/useValidForm";
import { useEmailVerification } from "@/hooks/useEmailVerification";
import { useQueryClient } from "@tanstack/react-query";
import { useEmailInputs } from "../../hooks/useEmailInputs";
import { usePatchEmail } from "../../hooks/usePatchEmail";
import LoadingWhite from "/src/assets/LoadingWhite.svg?react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { AxiosError } from "axios";
import { CodeInput, EmailInput } from "@/components";

const EmailChange = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { isOpen, toggle } = useToggle();
  const [ref, { height }] = useMeasure();
  const { seconds, reset } = useCodeTimer(false);
  const {
    emailInputRef,
    codeInputRef,
    email,
    code,
    handleEmailChange,
    handleEmailSelect,
    handleCodeChange,
  } = useEmailInputs();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [updatingError, setUpdatingError] = useState<string | null>(null);

  // 초기 렌더링 시 포커스
  useEffect(() => {
    if (isOpen) {
      emailInputRef.current?.focus();
    }
  }, [isOpen, emailInputRef]);

  // error상태일 때 폼 변경 시 초기화
  useEffect(() => {
    if (emailError) setEmailError(null);
  }, [email]);
  useEffect(() => {
    if (updatingError) setUpdatingError(null);
  }, [code]);

  const {
    mutate: emailMutate,
    isPending: emailIsPending,
    isSuccess: codeSended,
  } = useEmailVerification({
    onSuccess: () => {
      console.log("Email code sent successfully");
      setEmailError(null);
      setUpdatingError(null);
      // 인증 코드 타이머 시작
      reset();
    },
    onError: (error: AxiosError) => {
      if (error.status === 409) {
        setEmailError("이미 등록된 이메일입니다.");
      } else {
        console.log("Error post email:", error);
        setEmailError("문제가 발생했습니다. 다시 시도해주세요.");
      }
    },
  });
  useEffect(() => {
    if (codeSended) {
      codeInputRef.current?.focus();
    }
  }, [codeSended]);

  const { validEmail } = useValidForm();
  // 인증하기 버튼 클릭
  const handleVerifyClick = () => {
    const _error = validEmail(email);
    if (_error) {
      setEmailError(_error);
    } else {
      queryClient.setQueryData<string>(["email"], email);
      emailMutate(email);
    }
  };

  useEffect(() => {
    if (seconds === 0) {
      setUpdatingError("유효시간이 지났습니다. 다시 인증해주세요.");
    }
  }, [seconds]);

  const { mutate: updatingMutate, isPending: updatingIsPending } =
    usePatchEmail({
      onSuccess: () => {
        window.location.reload();
      },
      onError: (error: AxiosError) => {
        // 인증 코드가 잘못된 경우
        if (error.status === 400) {
          setUpdatingError("올바른 인증 코드가 아닙니다.");
          return;
        }
        console.log("Error post code:", error);
        setUpdatingError("문제가 발생했습니다. 다시 시도해주세요.");
      },
    });
  // 변경하기 버튼 클릭
  const handleChangeClick = () => {
    const email = queryClient.getQueryData<string>(["email"]);

    if (!email) {
      setUpdatingError("문제가 발생했습니다. 다시 시도해주세요.");
      return;
    }
    if (seconds > 0 && code && !isNaN(Number(code))) {
      updatingMutate({ code, email });
    }
  };

  // 각 입력 폼에서 "Enter"키를 눌렀을 때 넘어가기
  const handleKeyDownEnter =
    (field: "email" | "code") =>
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const _key = event.key;
      if (_key === "Enter") {
        // input에서 한글을 입력할 때 마지막 글자가 중복되는 현상 방지
        if (event.nativeEvent.isComposing) {
          return;
        }
        // email input일 때와 code input일 때 분리
        if (field === "email") {
          emailInputRef.current?.blur();
          handleVerifyClick();
        } else {
          handleChangeClick();
        }
      }
    };

  return (
    <div className="border border-(--gray-e0) rounded-15 mt-20">
      <div
        onClick={toggle}
        className="flex justify-between items-center p-30 hover:cursor-pointer"
      >
        <div>
          <p className="font-medium">이메일 수정</p>
          <p className="text-20 mt-8">{user!.email}</p>
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
          {/* 이메일 변경 폼 */}
          <div>
            <p className="font-medium">변경할 이메일</p>
            <div className="h-50 mt-10 flex gap-10 items-center">
              <EmailInput
                ref={emailInputRef}
                value={email}
                onChange={handleEmailChange}
                onSelectEmail={handleEmailSelect}
                onKeyDown={handleKeyDownEnter("email")}
                placeholder="이메일"
              />
              <button
                onClick={handleVerifyClick}
                disabled={emailIsPending || updatingIsPending}
                className={`flex justify-center items-center px-20 shrink-0 h-full text-white rounded-5 text-14 ${
                  email !== ""
                    ? "bg-(--gray-49) hover:cursor-pointer"
                    : "bg-(--gray-e0)"
                }`}
              >
                {emailIsPending ? <LoadingWhite /> : "인증하기"}
              </button>
            </div>
            {emailError && (
              <p className="mt-10 text-red-500 text-14">{emailError}</p>
            )}
          </div>
          {/* 인증 코드 입력 폼 */}
          <div>
            <p className="font-medium mt-30">인증 코드</p>
            <div className="h-50 mt-10 flex gap-10 items-center">
              <CodeInput
                ref={codeInputRef}
                seconds={seconds}
                value={code}
                onChange={handleCodeChange}
                handleKeyDownEnter={handleKeyDownEnter("code")}
                placeholder="인증 코드 6자리"
                isDisabled={seconds === 0 || !codeSended}
              />
              <button
                onClick={handleChangeClick}
                disabled={seconds === 0 || code === "" || !codeSended}
                className={`flex justify-center items-center px-20 shrink-0 h-full text-white rounded-5 text-14 ${
                  seconds && code !== "" && codeSended
                    ? "bg-(--gray-49) hover:cursor-pointer"
                    : "bg-(--gray-e0)"
                }`}
              >
                {updatingIsPending ? <LoadingWhite /> : "변경하기"}
              </button>
            </div>
            {updatingError && (
              <p className="mt-10 text-red-500 text-14">{updatingError}</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailChange;
