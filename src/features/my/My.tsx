// features/mypage/MyPage.tsx
// 마이 페이지
import { Footer, Header } from "@/components";
import { AccountSetting, Nav } from "./components";
import { useAuthStore } from "@/stores/authStore";
import { useValidUser } from "./hooks/useValidUser";
import { useMode } from "./hooks/useMode";
import { MYPAGE_MENU } from "@/constants/Menu";

const MyPage = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
  useValidUser(user, isAuthLoading);
  const { mode, handleClickMenu } = useMode(MYPAGE_MENU.length);

  // 로그인되어 있지 않으면
  if (isAuthLoading || !user) return null;
  return (
    <div>
      <div className="w-full min-h-[calc(100dvh-200px)]">
        <Header noBorder />
        <div className="w-full pt-80 pb-50">
          <Nav mode={mode} onClickMenu={handleClickMenu} />
          <div className="pt-60">
            {mode === 1 && <AccountSetting />}
            {mode === 2 && <></>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyPage;
