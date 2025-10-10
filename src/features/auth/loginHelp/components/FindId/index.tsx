// FindId/index.tsx
// 아이디 찾기 화면 컴포넌트
import { useState } from "react";
import EmailLevel from "./EmailLevel";
import CodeLevel from "./CodeLevel";
import Complete from "./Complete";
import { useLevel } from "../../hooks/useLevel";
import { useEmailCodeInputs } from "@/features/Auth/hooks/useInputs";

const FindId = () => {
  const { level, handleNextLevel, handlePrevLevel } = useLevel(3);
  const {
    email,
    code,
    handleEmailChange,
    handleEmailSelect,
    handleCodeChange,
  } = useEmailCodeInputs();
  const [foundId, setFoundId] = useState<string>("");

  return (
    <div className="max-w-400 px-20 mx-auto">
      {level === 1 && (
        <EmailLevel
          value={email}
          onChange={handleEmailChange}
          onSelectEmail={handleEmailSelect}
          onNextLevel={handleNextLevel}
          onPrevLevel={handlePrevLevel}
        />
      )}
      {level === 2 && (
        <CodeLevel
          value={code}
          onChange={handleCodeChange}
          onPrevLevel={handlePrevLevel}
          onNextLevel={handleNextLevel}
          onFoundId={(id) => setFoundId(id)}
        />
      )}
      {level === 3 && (
        <Complete foundId={foundId} onPrevLevel={handlePrevLevel} />
      )}
    </div>
  );
};

export default FindId;
