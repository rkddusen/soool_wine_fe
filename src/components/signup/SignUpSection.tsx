import SooolLogo from "/src/assets/soool_logo.svg?react";
import { useEffect, useState } from "react";
import SignUpPassword from "./SignUpPassword";
import SignUpId from "./SignUpId";
import SignUpEmail from "./SignUpEmail";
import SignUpCode from "./SignUpCode";
import { useNavigate } from "react-router-dom";
import {
  validCode,
  validEmail,
  validId,
  validPassword,
} from "../../utils/signUpValidators";

const inputNames = ["id", "password", "email", "address", "code"] as const;
type InputName = (typeof inputNames)[number];

const SignUpSection = () => {
  const [inputValues, setInputValues] = useState<Record<InputName, string>>({
    id: "",
    password: "",
    email: "",
    address: "",
    code: "",
  });
  const [level, setLevel] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (level < 1 || level > 5) {
      setLevel(1);
    } else {
      if (level > 1 && validId(inputValues["id"])) {
        setLevel(1);
      } else if (level > 2 && validPassword(inputValues["password"])) {
        setLevel(2);
      } else if (
        level > 3 &&
        validEmail(inputValues["email"], inputValues["address"])
      ) {
        setLevel(3);
      } else if (level > 4 && validCode(inputValues["code"])) {
        setLevel(4);
      }
    }
  }, [level]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: InputName
  ): void => {
    setInputValues((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };
  const handleSetAddress = (value: string): void => {
    setInputValues((prev) => ({
      ...prev,
      ["address"]: value,
    }));
  };

  const handleResetInput = (name: InputName): void => {
    setInputValues((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handlePrevLevel = (): void => {
    if (level > 1) {
      if (level === 4) {
        handleResetInput("code");
        handleResetInput("address");
      } else if (level === 3) {
        handleResetInput("address");
        handleResetInput("email");
        handleResetInput("password");
      } else {
        handleResetInput("password");
      }
      setLevel((prev) => prev - 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="max-w-full">
      <div className="h-full p-10 sm:p-50">
        <div className="relative flex items-center justify-center w-full bg-white sm:w-500 md:w-600 md:h-500 rounded-15">
          <div
            onClick={handlePrevLevel}
            className="absolute top-15 left-15 md:top-25 md:left-25 hover:cursor-pointer"
          >
            <svg
              className="w-24 h-24 md:w-26 md:h-26"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H6M12 5L5 12L12 19"
                strokeWidth="1.5"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="px-15 w-410 py-60">
            <div className="w-full md:h-40 sm:h-40 h-30">
              <SooolLogo />
            </div>
            <div className="w-full mt-50">
              <div className="relative w-full my-30">
                <div className="absolute z-1 top-6 bottom-6 left-10 right-10">
                  <div
                    className={`w-[${
                      25 * (level - 1)
                    }%] h-full rounded-full bg-49-gray transition-all duration-500`}
                    style={{ width: `${25 * (level - 1)}%` }}
                  ></div>
                </div>
                <div className="relative flex justify-between w-full z-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-center w-20 h-20 ${
                        level >= i + 1
                          ? "bg-49-gray text-white"
                          : "bg-white text-49-gray"
                      } border rounded-full border-49-gray text-12`}
                    >
                      {level > i + 1 ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                        >
                          <polyline
                            points="20 6 9 17 4 12"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></polyline>
                        </svg>
                      ) : (
                        <span>{i + 1}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {level === 1 && (
                <SignUpId
                  inputValue={{ id: inputValues["id"] }}
                  handleInputChange={handleInputChange}
                  setLevel={setLevel}
                />
              )}
              {level === 2 && (
                <SignUpPassword
                  inputValue={{ password: inputValues["password"] }}
                  handleInputChange={handleInputChange}
                  setLevel={setLevel}
                />
              )}
              {level === 3 && (
                <SignUpEmail
                  inputValue={{
                    email: inputValues["email"],
                    address: inputValues["address"],
                  }}
                  handleInputChange={handleInputChange}
                  handleResetInput={handleResetInput}
                  handleSetAddress={handleSetAddress}
                  setLevel={setLevel}
                />
              )}
              {level === 4 && (
                <SignUpCode
                  inputValue={{ code: inputValues["code"] }}
                  handleInputChange={handleInputChange}
                  setLevel={setLevel}
                />
              )}
              {level === 5 && null}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mb-10">
        <p className="text-center text-12">
          Copyright JeongKangE. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignUpSection;
