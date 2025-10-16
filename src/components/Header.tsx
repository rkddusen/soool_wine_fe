// components/Header.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import SooolLogoWine from "/src/assets/SooolLogoWine.svg?react";
import {
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useLogout } from "@/features/shared/Auth/hooks/useLogout";
import toast from "react-hot-toast";

interface HeaderProp {
  noBorder?: boolean;
}

const Header = ({ noBorder }: HeaderProp) => {
  const [isBorder, setIsBorder] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { logoutMutation } = useLogout();

  // 스크롤 위치가 0이면 그림자 효과 제거, 그렇지 않으면 그림자 효과 적용
  useEffect(() => {
    if (window.scrollY === 0) {
      setIsBorder(false);
    } else {
      setIsBorder(true);
    }
  }, []);

  // 스크롤 시 헤더의 그림자 효과를 적용
  // 스크롤 위치에 따라 헤더의 그림자 효과를 적용
  // 스크롤 위치가 0이면 그림자 효과 제거, 그렇지 않으면 그림자 효과 적용
  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY === 0) {
        setIsBorder(false);
      } else {
        setIsBorder(true);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 스크롤 시 body의 overflow를 hidden으로 설정하여 스크롤바 숨김
  // 메뉴가 열려있을 때만 적용
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  // 로그아웃 처리
  // 로그아웃 후 메인 페이지로 리다이렉트
  const handleLogout = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        setIsMenuOpen(false);
        navigate("/", { replace: true });
      },
      onError: (error) => {
        console.log("Error postLogout:", error);
        toast.error("로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.");
      },
    });
  };

  return (
    <div
      className={`${
        isBorder && !noBorder ? "shadow-sm" : "shadow-none"
      } z-99 fixed top-0 left-0 w-full bg-white h-80`}
    >
      <div className="flex flex-row items-center justify-between w-full h-full px-20 mx-auto md:px-40 max-w-1280">
        <Link to="/" className="h-20">
          <SooolLogoWine className="h-full" />
        </Link>
        <div className="absolute top-0 hidden h-full md:block x-center-absolute">
          <ul className="flex flex-row h-full text-18">
            <HeaderNav text="와인창고" link="storage" />
            <HeaderNav text="주변와인" link="place" />
          </ul>
        </div>
        {/* 768 ~ */}
        <div className="items-center justify-end hidden h-40 md:flex">
          {user ? (
            <>
              <Link
                to="#"
                onClick={handleLogout}
                className="mr-15 text-nowrap shrink-0 text-12 hover:cursor-pointer"
              >
                로그아웃
              </Link>
              <button onClick={() => navigate("/mypage")}>
                <UserIcon className="w-20 h-20 stroke-(--main) hover:cursor-pointer" />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-nowrap shrink-0 text-12 hover:cursor-pointer"
            >
              로그인
            </Link>
          )}
        </div>
        {/* ~ 768 */}
        <div className="block md:hidden">
          <button onClick={() => setIsMenuOpen(true)}>
            <Bars3Icon className="w-30 h-30 stroke-(--main) hover:cursor-pointer" />
          </button>
          <div
            className={`absolute overflow-y-auto overflow-x-hidden w-full h-[100vh] left-0 top-0 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-500`}
          >
            <div className={`flex flex-col w-full h-full bg-white`}>
              <div className="shrink-0 h-80 flex flex-row items-center justify-between w-full px-20 mx-auto md:px-40 xl:w-1280">
                <Link
                  to="/"
                  className="h-20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <SooolLogoWine className="h-full" />
                </Link>
                <button onClick={() => setIsMenuOpen(false)}>
                  <XMarkIcon className="w-30 h-30 stroke-(--main) hover:cursor-pointer" />
                </button>
              </div>
              <div className="h-full px-20 flex flex-col w-full">
                {user ? (
                  <div className="flex flex-wrap items-center justify-between w-full px-20 py-10 break-keep shrink-0 min-h-60 rounded-15 bg-(--light-main)">
                    <div className="flex items-center gap-10 max-w-full py-10 shrink-0">
                      <UserIcon className="w-20 h-20 stroke-(--main)" />
                      <span>"닉네임" 님 환영합니다.</span>
                    </div>
                    <Link
                      to="#"
                      onClick={handleLogout}
                      className="text-12 shrink-0 hover:cursor-pointer"
                    >
                      로그아웃
                    </Link>
                  </div>
                ) : (
                  <Link to="/login">
                    <div className="flex items-center justify-between w-full px-20 shrink-0 min-h-60 rounded-15 bg-(--light-main) hover:cursor-pointer">
                      <div className="flex items-center">
                        <UserIcon className="w-20 h-20 stroke-(--main) hover:cursor-pointer" />
                        <span className="ml-10">로그인이 필요합니다.</span>
                      </div>
                      <div>
                        <ChevronRightIcon className="w-20 h-20" />
                      </div>
                    </div>
                  </Link>
                )}
                <ul className="px-20 pb-40 text-20 sm:text-25">
                  <Link to={"/storage"} onClick={() => setIsMenuOpen(false)}>
                    <li className="py-10 mt-30 hover:text-(--main)">
                      <span>와인창고</span>
                    </li>
                  </Link>
                  <Link to={"/place"} onClick={() => setIsMenuOpen(false)}>
                    <li className="py-10 mt-30 hover:text-(--main)">
                      <span>주변와인</span>
                    </li>
                  </Link>
                  {user ? (
                    <Link to={"/mypage"} onClick={() => setIsMenuOpen(false)}>
                      <li className="py-10 mt-30 hover:text-(--main)">
                        <span>마이페이지</span>
                      </li>
                    </Link>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface HeaderNavComponentProps {
  text: string;
  link: string;
}
const HeaderNav = ({ text, link }: HeaderNavComponentProps) => {
  return (
    <li className="flex flex-row justify-center h-full w-100">
      <Link to={`/${link}`}>
        <div className="flex items-center h-full hover:cursor-pointer border-y-2 border-y-white hover:border-b-(--main) hover:text-(--main)">
          <span className="text-nowrap">{text}</span>
        </div>
      </Link>
    </li>
  );
};

export default Header;
