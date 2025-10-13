// pages/shared/SignUpPage.tsx
// 회원가입 페이지 라우팅
import { ScrollRestoration } from "react-router-dom";
import SignUp from "@/features/shared/Auth/SignUp";

const SignUpPage = () => {
  return (
    <>
      <ScrollRestoration />
      <SignUp />
    </>
  );
};

export default SignUpPage;
