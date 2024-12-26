import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const LayoutPage = () => {
  return (
    <div className="w-full h-full leading-1">
      <div className="w-full min-h-[calc(100%-200px)]">
        <Header />
        <div className="w-full px-20 mx-auto md:px-40 pt-80 pb-50 max-w-1280">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LayoutPage;
