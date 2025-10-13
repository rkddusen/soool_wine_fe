// LoginHelp/index.tsx
// 로그인 페이지
import { useNavigate } from "react-router-dom";
import { useTab } from "@/hooks/useTab";
import { LOGINHELP_MENU } from "@/constants/Menu";
import SooolLogo from "/src/assets/SooolLogo.svg?react";
import { FindId, FindPassword, Nav } from "./components";

const LoginHelp = () => {
  const { tab, handleClickMenu } = useTab("lhTab", LOGINHELP_MENU.length);
  const navigate = useNavigate();
  return (
    <div className="bg-(--lighter-main)">
      <section className="w-full mx-auto bg-white min-h-dvh max-w-600">
        <div className="w-full py-40 mx-auto text-center">
          <div
            className="inline-block md:h-35 h-30 hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            <SooolLogo />
          </div>
          <div className="mt-40 text-start">
            {/* nav */}
            <Nav mode={tab} onClickMenu={handleClickMenu} />
            <div className="py-60">
              {tab === 1 && <FindId />}
              {tab === 2 && <FindPassword />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginHelp;
