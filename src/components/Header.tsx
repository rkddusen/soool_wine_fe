import { useEffect, useState } from "react";
import SooolLogoWine from "/src/assets/SooolLogoWine.svg?react";
import { Link } from "react-router-dom";
import {
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  const [isBorder, setIsBorder] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false); // 로그인 변수는 최상위 컴포넌트에서 props로 받기
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (window.scrollY === 0) {
      setIsBorder(false);
    } else {
      setIsBorder(true);
    }

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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  ////////////
  useEffect(() => {
    setIsLogin(true);
  }, []);
  ////////////

  const moveLogout = (): void => {
    setIsLogin(false);
  };

  const moveMyPage = (): void => {
    // 마이페이지 이동
  };

  return (
    <div
      className={`${
        isBorder ? "shadow-sm" : "shadow-none"
      } z-99 fixed top-0 left-0 w-full bg-white h-80`}
    >
      <div className="flex flex-row items-center justify-between w-full h-full px-20 mx-auto md:px-40 max-w-1280">
        <Link to="/" className="h-20">
          <SooolLogoWine className="h-full" />
        </Link>
        {/* 768 <= */}
        <div className="items-center justify-end hidden h-40 md:flex">
          {isLogin ? (
            <>
              <span
                onClick={moveLogout}
                className="mr-15 text-nowrap shrink-0 text-12 hover:cursor-pointer"
              >
                로그아웃
              </span>
              <UserIcon
                onClick={moveMyPage}
                className="w-20 h-20 stroke-(--main) hover:cursor-pointer"
              />
            </>
          ) : (
            <span className="text-nowrap shrink-0 text-12 hover:cursor-pointer">
              <Link to="/login">로그인</Link>
            </span>
          )}
        </div>
        {/* < 768 */}
        <div className="block md:hidden">
          <Bars3Icon
            onClick={() => setIsMenuOpen(true)}
            className="w-30 h-30 stroke-(--main) hover:cursor-pointer"
          />
          <div
            className={`absolute overflow-y-auto overflow-x-hidden  md:hidden w-full h-[100vh] bg-white top-0 ${
              isMenuOpen ? "flex flex-col left-0" : "none left-full"
            } transition-left duration-500`}
          >
            <div className="shrink-0 h-80">
              <div className="flex flex-row items-center justify-between w-full h-full px-20 mx-auto md:px-40 xl:w-1280">
                <Link
                  to="/"
                  className="h-20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <SooolLogoWine className="h-full" />
                </Link>
                <XMarkIcon
                  onClick={() => setIsMenuOpen(false)}
                  className="w-30 h-30 stroke-(--main) hover:cursor-pointer"
                />
              </div>
            </div>
            <div className="h-full px-20">
              <div className="flex flex-col w-full h-full">
                {isLogin ? (
                  <div className="flex flex-wrap items-center justify-between w-full px-20 py-10 break-keep shrink-0 min-h-60 rounded-15 bg-(--light-main)">
                    <div className="flex items-center max-w-full py-10 shrink-0">
                      <UserIcon
                        onClick={moveMyPage}
                        className="w-20 h-20 stroke-(--main) hover:cursor-pointer"
                      />
                      <span className="pl-5">"닉네임" 님 환영합니다.</span>
                    </div>
                    <div className="text-center text-12 shrink-0">
                      <span
                        onClick={moveLogout}
                        className="hover:cursor-pointer"
                      >
                        로그아웃
                      </span>
                    </div>
                  </div>
                ) : (
                  <Link to="/login">
                    <div className="flex items-center justify-between w-full px-20 shrink-0 min-h-60 rounded-15 bg-(--light-main) hover:cursor-pointer">
                      <div className="flex items-center">
                        <UserIcon
                          onClick={moveMyPage}
                          className="w-20 h-20 stroke-(--main) hover:cursor-pointer"
                        />
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
                  <Link to={"/map"} onClick={() => setIsMenuOpen(false)}>
                    <li className="py-10 mt-30 hover:text-(--main)">
                      <span>주변와인</span>
                    </li>
                  </Link>
                  {isLogin ? (
                    <Link to={"/place"} onClick={() => setIsMenuOpen(false)}>
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
      <div className="absolute top-0 hidden h-full md:block x-center-absolute">
        <ul className="flex flex-row h-full text-18">
          <HeaderNav text="와인창고" link="storage" />
          <HeaderNav text="주변와인" link="map" />
        </ul>
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
