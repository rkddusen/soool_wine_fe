import { Link } from "react-router-dom";

const SignUpComplete = () => {
  return (
    <>
      <div className="w-full">
        <div className="text-center">
          <p className="pt-10 font-bold text-22">회원가입이 완료되었습니다.</p>
        </div>
      </div>
      <Link to={"/login"}>
        <div className="flex flex-row items-center justify-center w-full mt-15 h-50 rounded-15 bg-(--gray-49) hover:cursor-pointer">
          <span className="text-white text-16">로그인 하러가기</span>
        </div>
      </Link>
    </>
  );
};

export default SignUpComplete;
