import { useEffect, useState } from "react";
import SooolLogo from "/src/assets/soool_logo.svg?react";
import SignUpPassword from "./SignUpPassword";
import SignUpId from "./SignUpId";
import SignUpEmail from "./SignUpEmail";
import SignUpCode from "./SignUpCode";
import { useNavigate } from "react-router-dom";
import {
  validEmail,
  validId,
  validPassword,
} from "../../utils/signUpValidators";
import SignUpFinal from "./SignUpFinal";
import { useQueryClient } from "@tanstack/react-query";
import { SignUp } from "../../models/User";
import SignUpComplete from "./SignUpComplete";

const SignUpSection = () => {
  const [inputValues, setInputValues] = useState<SignUp>({
    id: "",
    password: "",
    email: "",
    code: "",
  });
  const [level, setLevel] = useState<number>(1);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (level < 1 || level > 6) {
      setLevel(1);
    } else {
      if (level > 1 && validId(inputValues["id"])) {
        setLevel(1);
      }
      if (level > 2 && validPassword(inputValues["password"])) {
        setLevel(2);
      }
      if (level > 3 && validEmail(inputValues["email"])) {
        setLevel(3);
      }
      if (level > 4) {
        if (!queryClient.getQueryData<boolean>(["isVerifySuccess"])) {
          setLevel(4);
        }
      }
      if (level > 5) {
        if (!queryClient.getQueryData<boolean>(["isSignUpSuccess"])) {
          setLevel(5);
        }
      }
    }
  }, [level]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: keyof SignUp
  ): void => {
    const { value, type } = event.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleEmailSelect = (email: string): void => {
    console.log(email);
    setInputValues((prev) => ({
      ...prev,
      email: email,
    }));
  };

  const handleResetInput = (name: keyof SignUp): void => {
    setInputValues((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handlePrevLevel = (): void => {
    if (level === 1) {
      navigate(-1);
    } else if (level > 1 && level < 6) {
      if (level === 2) {
        handleResetInput("password");
        setLevel(1);
      } else if (level === 3) {
        handleResetInput("email");
        handleResetInput("password");
        setLevel(2);
      } else {
        handleResetInput("code");
        setLevel(3);
      }
    }
  };

  return (
    <section className="max-w-full">
      <div className="bg-white sm:w-500 md:w-600 rounded-15">
        <div className="max-w-full mx-auto text-center px-15 w-410 sm:py-60">
          <div className="inline-block md:h-35 h-30">
            <SooolLogo />
          </div>
          <div className="text-start">
            <div className="relative w-full my-30">
              <div className="absolute z-1 top-12 bottom-12 left-15 right-15">
                <div
                  className={`h-full rounded-full bg-(--gray-49) transition-all duration-500`}
                  style={{
                    width: `${level === 6 ? 100 : 25 * (level - 1)}%`,
                  }}
                ></div>
              </div>
              <div className="relative flex justify-between w-full z-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-center w-30 h-30 ${
                      level >= i + 1
                        ? "bg-(--gray-49) text-white"
                        : "sm:bg-white text-(--gray-49)"
                    } border rounded-full border-(--gray-49) text-12`}
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
                handlePrevLevel={handlePrevLevel}
              />
            )}
            {level === 2 && (
              <SignUpPassword
                inputValue={{ password: inputValues["password"] }}
                handleInputChange={handleInputChange}
                setLevel={setLevel}
                handlePrevLevel={handlePrevLevel}
              />
            )}
            {level === 3 && (
              <SignUpEmail
                inputValue={{
                  email: inputValues["email"],
                }}
                handleInputChange={handleInputChange}
                setLevel={setLevel}
                handlePrevLevel={handlePrevLevel}
                handleEmailSelect={handleEmailSelect}
              />
            )}
            {level === 4 && (
              <SignUpCode
                inputValue={{ code: inputValues["code"] }}
                handleInputChange={handleInputChange}
                setLevel={setLevel}
                handlePrevLevel={handlePrevLevel}
              />
            )}
            {level === 5 && (
              <SignUpFinal
                user={inputValues}
                setLevel={setLevel}
                handlePrevLevel={handlePrevLevel}
              />
            )}
            {level === 6 && <SignUpComplete />}
          </div>
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

export default SignUpSection;
