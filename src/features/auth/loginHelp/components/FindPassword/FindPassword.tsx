// FindPassword/FindPassword.tsx
// 비밀번호 찾기 화면 컴포넌트
import IdEmailLevel from "./IdEmailLevel";
import CodeLevel from "./CodeLevel";
import PasswordLevel from "./PasswordLevel";
import Complete from "./Complete";
import { useLevel } from "../../hooks/useLevel";

const FindPassword = () => {
  const { level, handleNextLevel, handlePrevLevel } = useLevel(4);

  return (
    <div className="max-w-400 px-20 mx-auto">
      {level === 1 && (
        <IdEmailLevel
          onNextLevel={handleNextLevel}
          onPrevLevel={handlePrevLevel}
        />
      )}
      {level === 2 && (
        <CodeLevel
          onPrevLevel={handlePrevLevel}
          onNextLevel={handleNextLevel}
        />
      )}
      {level === 3 && (
        <PasswordLevel
          onPrevLevel={handlePrevLevel}
          onNextLevel={handleNextLevel}
        />
      )}
      {level === 4 && <Complete />}
    </div>
  );
};

export default FindPassword;
