// FindPassword/Complete.tsx
// 비밀번호 초기화를 완료했음을 보여주는 컴포넌트
// '로그인 하러가기' 버튼을 클릭하면 로그인 페이지(/login)로 이동
import { Link } from "react-router-dom";
import { NextBtn } from "@/components";

const Complete = () => {
  return (
    <>
      <div className="w-full">
        <div className="text-center">
          <p className="font-bold text-22">
            회원님의 비밀번호가 정상적으로 변경되었습니다.
          </p>
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
