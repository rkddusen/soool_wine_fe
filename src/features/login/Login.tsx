// features/login/Login.tsx
// 로그인 페이지
import { useEffect, useRef, useState } from "react";
import SooolLogo from "/src/assets/SooolLogo.svg?react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoginTokenResponse } from "../../models/Api";
import { postLogin } from "../../utils/api";
import { CustomError } from "../../models/SignUpError";
import {
  UserIcon,
  LockClosedIcon,
  EyeSlashIcon,
  EyeIcon,
  CheckCircleIcon as CheckCircleIconEmpty,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconFill } from "@heroicons/react/24/solid";

const Login = () => {
  const [idInput, setIdInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const idInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [idInputFocus, setIdInputFocus] = useState<boolean>(false);
  const [passwordInputFocus, setPasswordInputFocus] = useState<boolean>(false);
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [checkAutoLogin, setCheckAutoLogin] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [prevent, setPrevent] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    idInputRef.current?.focus();
    setIdInputFocus(true);
  }, []);

  const handleIdInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const _input = event.target.value;
    setIdInput(_input);
  };

  const handlePasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const _input = event.target.value;
    setPasswordInput(_input);
  };

  const handleSeePassword = (): void => {
    setSeePassword((prev) => !prev);
  };

  const handleGoPasswordInput = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    const _key = event.key;
    if (_key === "Enter") {
      if (event.nativeEvent.isComposing) {
        return;
      }
      if (idInput === "") return;
      passwordInputRef.current?.focus();
      setPasswordInputFocus(true);
      setIdInputFocus(false);
    }
  };

  const enterLogin = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    const _key = event.key;
    if (_key === "Enter") {
      handleLogin();
    }
  };

  const callPostLogin = async (): Promise<LoginTokenResponse> => {
    const data: LoginTokenResponse = await postLogin(idInput, passwordInput);
    return data;
  };

  const mutation = useMutation<LoginTokenResponse, AxiosError, void>({
    mutationFn: callPostLogin,
    onMutate: () => {
      setLoading(true);
      setPrevent(true);
    },
    onSuccess: (data) => {
      console.log("login successfully:", data);
    },
    onError: (error) => {
      console.log("Error login:", error);
      setError({
        code: "0003",
        message: "문제가 발생했습니다. 다시 시도해주세요.",
      });
    },
    onSettled: () => {
      setLoading(false);
      setPrevent(false);
    },
  });

  const handleLogin = (): void => {
    // 로그인 확인
    if (idInput === "") {
      setError({
        code: "0001",
        message: "아이디를 입력해주세요.",
      });
    } else if (passwordInput === "") {
      setError({
        code: "0002",
        message: "비밀번호를 입력해주세요.",
      });
    } else {
      mutation.mutate();
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
              prevent ? "pointer-events-none" : ""
            }`}
          >
            <div className="mt-10">
              <div
                className={`flex items-center w-full px-20 mb-10 h-50 rounded-5 ${
                  idInputFocus
                    ? "border-black border-[1.5px]"
                    : "border-(--gray-78) border"
                }`}
              >
                <UserIcon
                  className={`w-20 h-20 shrink-0 ${
                    idInputFocus ? "stroke-black" : "stroke-(--gray-bb)"
                  }`}
                />
                <input
                  ref={idInputRef}
                  type="text"
                  value={idInput}
                  onChange={handleIdInputChange}
                  onKeyDown={handleGoPasswordInput}
                  onFocus={() => {
                    setIdInputFocus(true);
                    setError(null);
                  }}
                  onBlur={() => setIdInputFocus(false)}
                  placeholder="아이디"
                  className="w-full h-full ml-10 border-none outline-hidden"
                />
              </div>
              <div
                className={`flex items-center w-full px-20 h-50 rounded-5 ${
                  passwordInputFocus
                    ? "border-black border-[1.5px]"
                    : "border-(--gray-78) border"
                }`}
              >
                <LockClosedIcon
                  className={`w-20 h-20 shrink-0 ${
                    passwordInputFocus ? "stroke-black" : "stroke-(--gray-bb)"
                  }`}
                />
                <input
                  ref={passwordInputRef}
                  type={seePassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={handlePasswordInputChange}
                  onKeyDown={enterLogin}
                  onFocus={() => {
                    setPasswordInputFocus(true);
                    setError(null);
                  }}
                  onBlur={() => setPasswordInputFocus(false)}
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
            </div>
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
            <div className="mt-5">
              {error && <p className="text-red-500 text-14">{error.message}</p>}
            </div>
            <div
              onClick={loading ? undefined : handleLogin}
              className="flex items-center justify-center w-full mt-10 h-50 rounded-15 bg-(--gray-49) hover:cursor-pointer"
            >
              <span className="text-white text-16">로그인</span>
            </div>
          </div>
          <ul className="mt-10 text-14">
            <li className="inline-block mt-5 pr-15 hover:underline break-keep">
              아이디 찾기
            </li>
            <li className="mt-5 inline-block px-15 border-l hover:underline break-keep border-l-(--gray-78)">
              비밀번호 찾기
            </li>
            <li className="mt-5 inline-block pl-15 hover:underline break-keep border-l border-l-(--gray-78)">
              <Link to="/signup">회원가입</Link>
            </li>
          </ul>
          <div className="w-full mt-20">
            <p className="text-12 text-(--gray-78)">
              ©JeongKangE. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
