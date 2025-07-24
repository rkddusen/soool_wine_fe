// features/signup/SignUp.tsx
// 회원가입 페이지
import { useNavigate } from "react-router-dom";
import {
  IdLevel,
  PasswordLevel,
  EmailLevel,
  CodeLevel,
  FinalLevel,
  Complete,
  LevelBar,
} from "./components";
import { LoginFooter } from "@/components";
import { useSignUpInput } from "./hooks/useSignUpInput";
import { useSignUpLevel } from "./hooks/useSignUpLevel";
import SooolLogo from "/src/assets/SooolLogo.svg?react";

const SignUp = () => {
  const navigate = useNavigate();
  const { inputValues, setInputValues, handleInputChange, handleEmailSelect } =
    useSignUpInput();
  const { level, handlePrevLevel, handleNextLevel } = useSignUpLevel(
    inputValues,
    setInputValues
  );

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
          {/* 레벨을 보여주는 progress bar */}
          <LevelBar level={level} />
          {/* 입력 폼 */}
          <div className="text-start mt-30">
            {level === 1 && (
              <IdLevel
                value={inputValues["id"]}
                onChange={handleInputChange}
                onPrevLevel={handlePrevLevel}
                onNextLevel={handleNextLevel}
              />
            )}
            {level === 2 && (
              <PasswordLevel
                value={inputValues["password"]}
                onChange={handleInputChange}
                onPrevLevel={handlePrevLevel}
                onNextLevel={handleNextLevel}
              />
            )}
            {level === 3 && (
              <EmailLevel
                value={inputValues["email"]}
                onChange={handleInputChange}
                onSelectEmail={handleEmailSelect}
                onPrevLevel={handlePrevLevel}
                onNextLevel={handleNextLevel}
              />
            )}
            {level === 4 && (
              <CodeLevel
                value={inputValues["code"]}
                onChange={handleInputChange}
                onPrevLevel={handlePrevLevel}
                onNextLevel={handleNextLevel}
              />
            )}
            {level === 5 && (
              <FinalLevel
                user={inputValues}
                onPrevLevel={handlePrevLevel}
                onNextLevel={handleNextLevel}
              />
            )}
            {level === 6 && <Complete />}
          </div>
          <LoginFooter />
        </div>
      </section>
    </div>
  );
};

export default SignUp;
