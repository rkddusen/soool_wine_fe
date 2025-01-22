import { Link } from "react-router-dom";

interface SignUpCompleteComponentProps {
  userId: string;
}
const SignUpComplete = ({ userId }: SignUpCompleteComponentProps) => {
  const nextLevel = () => {};
  return (
    <>
      <div className="w-full">
        <div className="text-center">
          <p className="pt-10 font-bold text-22">회원가입이 완료되었습니다!</p>
          <p className="mb-15 mt-15 text-16 text-78-gray">아이디 : {userId}</p>
        </div>
      </div>
      <Link to="/login">
        <div
          onClick={nextLevel}
          className="flex flex-row items-center justify-center w-full mt-15 h-50 rounded-15 bg-49-gray hover:cursor-pointer"
        >
          <span className="text-white text-16">로그인하러 가기</span>
        </div>
      </Link>
    </>
  );
};

export default SignUpComplete;
