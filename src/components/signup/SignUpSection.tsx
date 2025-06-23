import { useEffect, useState } from "react";
import SooolLogo from "/src/assets/SooolLogo.svg?react";
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
import { CheckIcon } from "@heroicons/react/24/outline";

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
    <section className="flex flex-col justify-center w-full mx-auto bg-white min-h-dvh max-w-600">
      <div className="w-full py-40 mx-auto text-center max-w-400 px-15">
        <div
          className="inline-block md:h-35 h-30 hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          <SooolLogo />
        </div>
        <div className="relative w-full mt-30">
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
                  <CheckIcon className="w-16 h-16" />
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="text-start mt-30">
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
        <div className="w-full mt-20">
          <p className="text-12 text-(--gray-78)">
            ©JeongKangE. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUpSection;
