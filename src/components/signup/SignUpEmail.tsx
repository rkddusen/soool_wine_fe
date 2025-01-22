import { useEffect, useRef, useState } from "react";
import { SignUpError } from "../../models/SignUpError";
import { validEmail } from "../../utils/signUpValidators";

const inputNames = ["email", "address"] as const;
type InputName = (typeof inputNames)[number];

interface SignUpEmailComponentProps {
  inputValue: Record<InputName, string>;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    name: InputName
  ) => void;
  handleResetInput: (name: InputName) => void;
  handleSetAddress: (value: string) => void;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
}

const SignUpEmail = ({
  inputValue,
  handleInputChange,
  handleResetInput,
  handleSetAddress,
  setLevel,
}: SignUpEmailComponentProps) => {
  const [emailFocus, setEmailFocus] = useState<boolean>(false);
  const [addressFocus, setAddressFocus] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const [select, setSelect] = useState<number>(-1);
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const selectName = [
    "naver.com",
    "gmail.com",
    "hanmail.net",
    "daum.net",
    "outlook.com",
    "icloud.com",
    "직접 입력",
  ];
  const [error, setError] = useState<SignUpError | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (openSelect && !selectRef.current?.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  });

  const handleEmailOnFocus = (): void => {
    setEmailFocus(true);
    setError(null);
  };
  const handleEmailOnBlur = (): void => {
    setEmailFocus(false);
  };
  const handleAddressOnFocus = (): void => {
    setAddressFocus(true);
    setError(null);
  };
  const handleAddressOnBlur = (): void => {
    setAddressFocus(false);
  };

  const handleSelectMail = (i: number): void => {
    setSelect(i);
    setOpenSelect(false);
    if (i < 6) {
      handleSetAddress(selectName[i]);
    } else {
      handleResetInput("address");
    }

    setError(null);
  };
  const handleResetMail = (): void => {
    setSelect(-1);
    handleResetInput("address");
  };

  const nextLevel = () => {
    const _error = validEmail(inputValue["email"], inputValue["address"]);
    if (_error) {
      setError(_error);
    } else {
      setLevel(4);
    }
  };

  return (
    <>
      <div className="w-full mb-15">
        <div className="mb-15">
          <p className="mb-10 font-bold text-20">이메일을 입력해주세요!</p>
          <div className={`flex items-center gap-5`}>
            <div
              className={`w-full px-15 h-50 ${
                emailFocus ? "border-black border-1.5" : "border-78-gray border"
              } rounded-5`}
            >
              <input
                ref={emailRef}
                type="text"
                value={inputValue["email"]}
                onChange={(e) => handleInputChange(e, "email")}
                onFocus={handleEmailOnFocus}
                onBlur={handleEmailOnBlur}
                placeholder="이메일"
                className="w-full h-full border-none outline-none"
              />
            </div>
            <span className="shrink-0 text-nowrap text-20">@</span>
            {select < 6 ? (
              <div ref={selectRef} className="relative w-full">
                <div
                  onClick={() => setOpenSelect((prev) => !prev)}
                  className="flex items-center w-full border h-50 px-15 rounded-5 border-78-gray hover:cursor-pointer"
                >
                  <p className="w-full text-78-gray">
                    {select > -1 ? selectName[select] : "선택해주세요."}
                  </p>
                  <svg
                    className="shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {openSelect ? (
                  <div className="absolute left-0 w-full overflow-y-scroll bg-white border top-55 h-140 border-78-gray rounded-5">
                    {selectName.map((v, i) => (
                      <div
                        onClick={() => handleSelectMail(i)}
                        key={i}
                        className="flex items-center justify-center w-full h-40 hover:cursor-pointer hover:bg-f5-gray"
                      >
                        <p className="text-16">{v}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <div
                className={`flex items-center w-full px-15 h-50 ${
                  addressFocus
                    ? "border-black border-1.5"
                    : "border-78-gray border"
                } rounded-5`}
              >
                <input
                  ref={addressRef}
                  type="text"
                  value={inputValue["address"]}
                  onChange={(e) => handleInputChange(e, "address")}
                  onFocus={handleAddressOnFocus}
                  onBlur={handleAddressOnBlur}
                  placeholder="직접 입력"
                  className="w-full h-full mr-10 border-none outline-none"
                />
                <svg
                  onClick={handleResetMail}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                >
                  <line
                    x1="18"
                    y1="6"
                    x2="6"
                    y2="18"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></line>
                  <line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></line>
                </svg>
              </div>
            )}
          </div>
          {error && (
            <p className="mt-10 text-red-500 text-14">{error.message}</p>
          )}
        </div>
      </div>
      <div
        onClick={nextLevel}
        className="flex flex-row items-center justify-center w-full h-50 rounded-15 bg-49-gray hover:cursor-pointer"
      >
        <span className="text-white text-16">인증 코드 전송하기</span>
      </div>
    </>
  );
};

export default SignUpEmail;
