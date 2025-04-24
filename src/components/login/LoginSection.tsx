import { useEffect, useRef, useState } from "react";
import SooolLogo from "/src/assets/soool_logo.svg?react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoginTokenResponse } from "../../models/Api";
import { postLogin } from "../../utils/api";
import { CustomError } from "../../models/SignUpError";

const LoginSection = () => {
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
    <section className="max-w-full">
      <div className="bg-white sm:w-500 md:w-600 rounded-15">
        <div className="max-w-full mx-auto text-center px-15 w-410 sm:py-60">
          <div
            className="inline-block md:h-35 h-30"
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
                className={`flex items-center w-full px-20 mb-10 h-50 ${
                  idInputFocus
                    ? "border-black border-[1.5px]"
                    : "border-(--gray-78) border"
                } rounded-5`}
              >
                <svg
                  className={`shrink-0 ${
                    idInputFocus ? "stroke-black" : "stroke-(--gray-bb)"
                  }`}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 9.33333C12.2091 9.33333 14 7.54247 14 5.33333C14 3.12419 12.2091 1.33333 10 1.33333C7.79086 1.33333 6 3.12419 6 5.33333C6 7.54247 7.79086 9.33333 10 9.33333Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2.32262 15.1643C3.00942 12.5593 5.61393 11.3333 8.22314 11.3333H11.7768C14.3861 11.3333 16.9906 12.5593 17.6774 15.1643C17.8181 15.6986 17.9307 16.2766 17.9944 16.8906C18.0578 17.5008 17.5715 18 16.9786 18H3.02141C2.42847 18 1.94222 17.5008 2.00556 16.8906C2.06932 16.2766 2.18179 15.6986 2.32262 15.1643Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
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
                className={`flex items-center w-full px-20 h-50 ${
                  passwordInputFocus
                    ? "border-black border-[1.5px]"
                    : "border-(--gray-78) border"
                } rounded-5`}
              >
                <svg
                  className={`shrink-0 ${
                    passwordInputFocus ? "fill-black" : "fill-(--gray-bb)"
                  }`}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.5068 19.8571H4.49251C3.76694 19.8556 3.07153 19.5667 2.55853 19.0536C2.04552 18.5405 1.75673 17.845 1.75537 17.1194V8.92228C1.75673 8.19671 2.04552 7.50124 2.55853 6.98813C3.07153 6.47502 3.76694 6.18608 4.49251 6.18457H15.5068C16.2325 6.18593 16.928 6.4748 17.4412 6.98793C17.9543 7.50106 18.2432 8.19662 18.2445 8.92228V17.1194C18.2432 17.8451 17.9543 18.5407 17.4412 19.0538C16.928 19.5669 16.2325 19.8558 15.5068 19.8571ZM4.49251 7.61314C4.14545 7.61344 3.8127 7.75149 3.56735 7.99695C3.32199 8.24241 3.18409 8.57522 3.18394 8.92228V17.1194C3.18409 17.4665 3.32199 17.7993 3.56735 18.0448C3.8127 18.2902 4.14545 18.4283 4.49251 18.4286H15.5068C15.8539 18.4283 16.1867 18.2902 16.4322 18.0448C16.6776 17.7994 16.8156 17.4665 16.8159 17.1194V8.92228C16.8156 8.57517 16.6776 8.24236 16.4322 7.99692C16.1867 7.75147 15.8539 7.61344 15.5068 7.61314H4.49251Z" />
                  <path d="M14.5926 7.61316C14.4031 7.61316 14.2214 7.5379 14.0875 7.40395C13.9535 7.26999 13.8783 7.08831 13.8783 6.89887V4.91887C13.873 4.47335 13.7714 4.03424 13.5806 3.63163C13.3897 3.22902 13.1141 2.87243 12.7726 2.5863C12.0043 1.91914 11.0174 1.55791 9.99998 1.57144C7.86055 1.57144 6.11998 3.07316 6.11998 4.91887V6.89887C6.11998 7.08831 6.04472 7.26999 5.91077 7.40395C5.77681 7.5379 5.59513 7.61316 5.40569 7.61316C5.21625 7.61316 5.03457 7.5379 4.90062 7.40395C4.76666 7.26999 4.69141 7.08831 4.69141 6.89887V4.91887C4.68969 2.28573 7.07141 0.14287 9.99998 0.14287C11.3664 0.128171 12.6906 0.616265 13.7206 1.5143C14.2149 1.93354 14.6127 2.45468 14.8868 3.04202C15.1609 3.62936 15.3047 4.26902 15.3086 4.91716V6.89716C15.3088 6.99125 15.2904 7.08445 15.2545 7.17142C15.2186 7.2584 15.1659 7.33742 15.0993 7.40395C15.0328 7.47048 14.9538 7.52321 14.8668 7.55911C14.7798 7.59502 14.6866 7.61338 14.5926 7.61316Z" />
                  <path d="M10.0001 14.7309C9.81061 14.7309 9.62893 14.6556 9.49498 14.5216C9.36102 14.3877 9.28577 14.206 9.28577 14.0166V12.1143C9.28577 11.9248 9.36102 11.7432 9.49498 11.6092C9.62893 11.4752 9.81061 11.4 10.0001 11.4C10.1895 11.4 10.3712 11.4752 10.5051 11.6092C10.6391 11.7432 10.7143 11.9248 10.7143 12.1143V14.0194C10.7136 14.2084 10.638 14.3893 10.5041 14.5227C10.3702 14.656 10.189 14.7309 10.0001 14.7309Z" />
                </svg>
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
                  <svg
                    onClick={handleSeePassword}
                    className="w-20 h-20 hover:cursor-pointer"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="black"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.7143 9.13549C18.1095 9.65141 18.1095 10.3492 17.7143 10.8652C16.47 12.4893 13.4848 15.8337 9.99998 15.8337C6.51517 15.8337 3.52996 12.4893 2.28568 10.8652C1.89046 10.3492 1.89045 9.65141 2.28567 9.13549C3.52996 7.51133 6.51517 4.16699 9.99998 4.16699C13.4848 4.16699 16.47 7.51133 17.7143 9.13549Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    onClick={handleSeePassword}
                    className="w-20 h-20 hover:cursor-pointer"
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="#787878"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1.66669 8.33301C1.66669 8.33301 4.58335 11.6663 10 11.6663C15.4167 11.6663 18.3334 8.33301 18.3334 8.33301" />
                    <path d="M3.33335 9.7041L1.66669 11.667" />
                    <path d="M18.3333 11.6667L16.6699 9.70703" />
                    <path d="M7.4284 11.3994L6.66669 13.7497" />
                    <path d="M12.5521 11.4062L13.3333 13.75" />
                  </svg>
                )}
              </div>
            </div>
            <div className="inline-block mt-10">
              <div
                onClick={() => setCheckAutoLogin((prev) => !prev)}
                className="flex flex-row items-center gap-5 hover:cursor-pointer"
              >
                <svg
                  className={`${
                    checkAutoLogin
                      ? "stroke-white fill-(--main)"
                      : "stroke-(--gray-78) fill-none"
                  }`}
                  width="22"
                  height="22"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 6 0.5 A 5.5 5.5 0 1 1 5.999 0.5"
                    className={`${checkAutoLogin && "stroke-(--main)"}`}
                    strokeWidth="0.7"
                  />
                  <path
                    d="M3.5 6.3 L5 7.8 L8.5 3.8"
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-14 text-(--gray-49)">자동 로그인</span>
              </div>
            </div>
            {error && (
              <p className="mt-5 text-red-500 text-14">{error.message}</p>
            )}
            <div
              onClick={loading ? undefined : handleLogin}
              className="flex flex-row items-center justify-center w-full mt-10 h-50 rounded-15 bg-(--gray-49) hover:cursor-pointer"
            >
              <span className="text-white text-16">로그인</span>
            </div>
          </div>
          <ul className="mt-10 text-center text-14">
            <li className="inline-block mt-5 pr-14 hover:underline break-keep">
              아이디 찾기
            </li>
            <li className="mt-5 inline-block px-14 border-l hover:underline break-keep border-l-(--gray-78)">
              비밀번호 찾기
            </li>
            <li className="mt-5 inline-block pl-14 hover:underline break-keep border-l border-l-(--gray-78)">
              <Link to="/signup">회원가입</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full mt-20">
        <p className="text-center text-12 text-(--gray-78)">
          ©JeongKangE. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default LoginSection;
