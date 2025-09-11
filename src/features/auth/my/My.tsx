// features/mypage/MyPage.tsx
// 마이 페이지
import { Footer, Header } from "@/components";
import { AccountSetting, MyWishlist, MyMemo, Nav } from "./components";
import { useAuthStore } from "@/stores/authStore";
import { useRequireLogin } from "./hooks/useRequireLogin";
import { useTab } from "@/hooks/useTab";
import { MYPAGE_MENU } from "@/constants/Menu";

const MyPage = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
  useRequireLogin(user, isAuthLoading);
  const { tab, handleClickMenu } = useTab("mTab", MYPAGE_MENU.length);

  // 로그인되어 있지 않으면
  if (isAuthLoading || !user) return null;
  return (
    <div>
      <div className="w-full min-h-[calc(100dvh-200px)]">
        <Header noBorder />
        <div className="w-full pt-80 pb-50">
          <Nav mode={tab} onClickMenu={handleClickMenu} />
          <div className="pt-60">
            {tab === 1 && <AccountSetting />}
            {tab === 2 && <MyWishlist />}
            {tab === 3 && <MyMemo />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyPage;
