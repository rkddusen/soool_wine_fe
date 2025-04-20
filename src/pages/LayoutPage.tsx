import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

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
