// features/SignUp/index.tsx
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
import { useSignUpLevel } from "./hooks/useSignUpLevel";
import SooolLogo from "/src/assets/SooolLogo.svg?react";
import {
  useEmailCodeInputs,
  useIdInput,
  usePasswordInput,
} from "../hooks/useInputs";

const SignUp = () => {
  const navigate = useNavigate();
  const { id, handleIdChange } = useIdInput();
  const { password, handlePasswordChange, handlePasswordReset } =
    usePasswordInput();
  const {
    email,
    code,
    handleEmailChange,
    handleEmailSelect,
    handleCodeChange,
    handleEmailReset,
    handleCodeReset,
  } = useEmailCodeInputs();

  const { level, handlePrevLevel, handleNextLevel } = useSignUpLevel(
    { id, password, email, code },
    handlePasswordReset,
    handleEmailReset,
    handleCodeReset
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
                value={id}
                onChange={handleIdChange}
                onPrevLevel={handlePrevLevel}
                onNextLevel={handleNextLevel}
              />
            )}
            {level === 2 && (
              <PasswordLevel
                value={password}
                onChange={handlePasswordChange}
                onPrevLevel={handlePrevLevel}
                onNextLevel={handleNextLevel}
              />
            )}
            {level === 3 && (
              <EmailLevel
                value={email}
                onChange={handleEmailChange}
                onSelectEmail={handleEmailSelect}
                onPrevLevel={handlePrevLevel}
                onNextLevel={handleNextLevel}
              />
            )}
            {level === 4 && (
              <CodeLevel
                value={code}
                onChange={handleCodeChange}
                onPrevLevel={handlePrevLevel}
                onNextLevel={handleNextLevel}
              />
            )}
            {level === 5 && (
              <FinalLevel
                user={{ id, password, email, code }}
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
