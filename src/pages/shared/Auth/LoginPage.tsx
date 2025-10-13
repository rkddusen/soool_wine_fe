// pages/shared/LoginPage.tsx
// 로그인 페이지 라우팅
import { ScrollRestoration } from "react-router-dom";
import Login from "@/features/shared/Auth/Login";

const LoginPage = () => {
  return (
    <>
      <ScrollRestoration />
      <Login />
    </>
  );
};

export default LoginPage;
