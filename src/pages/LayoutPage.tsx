// pages/LayoutPage.tsx
// 공통 페이지 라우팅
import { Outlet } from "react-router-dom";
import { Header, Footer } from "@/components";

const LayoutPage = () => {
  return (
    <div className="w-full h-full bg-linear-(--bg-linear)">
      <div className="w-full min-h-[calc(100dvh-200px)]">
        <Header />
        <div className="w-full pt-80 pb-50">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LayoutPage;
