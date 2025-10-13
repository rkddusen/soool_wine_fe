// FindId/Complete.tsx
// 아이디 찾기를 완료하여 아이디를 보여주는 컴포넌트
// '로그인 하러가기' 버튼을 클릭하면 로그인 페이지(/login)로 이동
import { Link } from "react-router-dom";
import { NextBtn, PrevBtn } from "@/components";

interface CompleteProps {
  foundId: string;
  onPrevLevel: () => void;
}

const Complete = ({ foundId, onPrevLevel }: CompleteProps) => {
  if (foundId === "") {
    return (
      <>
        <div className="w-full">
          <div className="text-center">
            <p className="py-20">
              죄송합니다. 예상치 못한 오류가 발생했습니다.
            </p>
          </div>
        </div>
        <div className="flex gap-10 h-50">
          <PrevBtn onClick={onPrevLevel} />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="w-full">
        <div className="text-center">
          <p className="font-bold text-22">
            회원님의 아이디는 다음과 같습니다.
          </p>
          <p className="py-20">{foundId}</p>
        </div>
      </div>
      <Link to={"/login"}>
        <div className="flex gap-10 h-50">
          <NextBtn onClick={() => {}} text="로그인 하러가기" />
        </div>
      </Link>
    </>
  );
};

export default Complete;
