// features/login/Login.tsx
// 로그인 페이지
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IdInput, LoginHelp, PasswordInput } from "./components";
import { LoginFooter, NextBtn } from "@/components";
import { useLogin } from "./hooks/useLogin";
import { useLoginform } from "./hooks/useLoginForm";
import SooolLogo from "/src/assets/SooolLogo.svg?react";
import { CheckCircleIcon as CheckCircleIconEmpty } from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconFill } from "@heroicons/react/24/solid";

const Login = () => {
  const idInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [checkAutoLogin, setCheckAutoLogin] = useState<boolean>(false);
  // 로그인 버튼을 눌렀을 때 입력창 막기
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isLoading, loginMutation } = useLogin();
  const { idInput, handleChangeId, passwordInput, handleChangePassword } =
    useLoginform();

  // 초기 렌더링 시 아이디 폼 포커스
  useEffect(() => {
    idInputRef.current?.focus();
  }, []);

  // error상태일 때 폼 변경 시 초기화
  useEffect(() => {
    if (error) setError(null);
  }, [idInput, passwordInput]);

  const handleLogin = () => {
    // 입력 잠금
    setIsDisabled(true);
    setError(null);

    // 아이디 비밀번호 빈 값 검증
    if (idInput === "") {
      setError("아이디를 입력해주세요.");
      setIsDisabled(false);
      return;
    }

    if (passwordInput === "") {
      setError("비밀번호를 입력해주세요.");
      setIsDisabled(false);
      return;
    }

    loginMutation(
      { id: idInput, password: passwordInput },
      {
        onSuccess: (data) => {
          // 로그인
        },
        onError: (error) => {
          console.log("Error postLogin:", error);
          setError("문제가 발생했습니다. 다시 시도해주세요.");
        },
        onSettled: () => {
          setIsDisabled(false);
        },
      }
    );
  };

  // 각 입력 폼에서 "Enter"키를 눌렀을 때 넘어가기
  const handleKeyDownEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
    field: "id" | undefined
  ) => {
    const _key = event.key;
    if (_key === "Enter") {
      // input에서 한글을 입력할 때 마지막 글자가 중복되는 현상 방지
      if (event.nativeEvent.isComposing) {
        return;
      }
      // id input일 때와 password input일 때 분리
      if (field === "id") {
        if (idInput === "") return;
        passwordInputRef.current?.focus();
      } else {
        handleLogin();
      }
    }
  };

  return (
    <div className="bg-(--lighter-main)">
      <section className="flex flex-col justify-center w-full mx-auto bg-white min-h-dvh max-w-600">
        <div className="w-full py-40 mx-auto text-center max-w-400 px-15">
          <div
            className="inline-block md:h-35 h-30 hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            <SooolLogo />
          </div>
          <div
            className={`mt-30 text-start ${
              isDisabled && "pointer-events-none"
            }`}
          >
            {/* 로그인 폼 */}
            <div className="mt-10">
              <IdInput
                ref={idInputRef}
                idInput={idInput}
                onChangeId={handleChangeId}
                onKeyDown={handleKeyDownEnter}
              />
              <PasswordInput
                ref={passwordInputRef}
                passwordInput={passwordInput}
                onChangePassword={handleChangePassword}
                onKeyDown={handleKeyDownEnter}
              />
            </div>
            {/* 자동 로그인 */}
            <div
              onClick={() => setCheckAutoLogin((prev) => !prev)}
              className="inline-flex items-center gap-5 mt-10 hover:cursor-pointer"
            >
              {checkAutoLogin ? (
                <CheckCircleIconFill className="w-24 h-24 fill-(--main)" />
              ) : (
                <CheckCircleIconEmpty className="w-24 h-24 stroke-(--gray-bb)" />
              )}
              <span className="text-14 text-(--gray-49)">자동 로그인</span>
            </div>
            {/* 오류 메시지 */}
            <div className="mt-5">
              {error && <p className="text-red-500 text-14">{error}</p>}
            </div>
            {/* 로그인 버튼 */}
            <div className="w-full flex gap-10 mt-20 h-50">
              <NextBtn
                isLoading={isLoading}
                onClick={handleLogin}
                text="로그인"
              />
            </div>
          </div>
          {/* 아이디 찾기, 비밀번호 찾기, 회원가입 메뉴 */}
          <LoginHelp />
          <LoginFooter />
        </div>
      </section>
    </div>
  );
};

export default Login;
