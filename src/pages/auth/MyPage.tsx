// pages/MyPage.tsx
// 마이페이지 라우팅
import { ScrollRestoration } from "react-router-dom";
import My from "@/features/Auth/My";

const MyPage = () => {
  return (
    <>
      <ScrollRestoration />
      <My />;
    </>
  );
};

export default MyPage;
