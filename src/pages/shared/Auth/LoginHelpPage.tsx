// pages/shared/LoginHelpPage.tsx
// 로그인 도움 페이지 라우팅
import { ScrollRestoration } from "react-router-dom";
import LoginHelp from "@/features/shared/Auth/LoginHelp";

const LoginHelpPage = () => {
  return (
    <>
      <ScrollRestoration />
      <LoginHelp />
    </>
  );
};

export default LoginHelpPage;
