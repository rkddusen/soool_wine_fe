import { useEffect, useState } from "react";
import SooolLogoWine from "/src/assets/soool_logo_wine.svg?react";
import { Link } from "react-router-dom";

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
        isBorder ? "shadow" : "shadow-none"
      } z-99 fixed top-0 left-0 w-full bg-white h-80`}
    >
      <div className="flex flex-row items-center justify-between w-full h-full px-20 mx-auto md:px-40 max-w-1280">
        <Link to="/" className="h-20">
          <SooolLogoWine className="h-full" />
        </Link>
        <div className="items-center justify-end hidden h-40 md:flex">
          {isLogin ? (
            <>
              <span
                onClick={moveLogout}
                className="mr-15 text-nowrap shrink-0 text-12 hover:cursor-pointer"
              >
                로그아웃
              </span>
              <svg
                onClick={moveMyPage}
                className="w-20 h-20 stroke-1.5 stroke-main fill-none hover:cursor-pointer"
                viewBox="0 0 22 22"
                strokeLinecap="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 10.2667C13.43 10.2667 15.4 8.29673 15.4 5.86667C15.4 3.43662 13.43 1.46667 11 1.46667C8.56992 1.46667 6.59998 3.43662 6.59998 5.86667C6.59998 8.29673 8.56992 10.2667 11 10.2667Z" />
                <path d="M2.55483 16.6808C3.31031 13.8153 6.17527 12.4667 9.0454 12.4667H12.9545C15.8246 12.4667 18.6896 13.8153 19.4451 16.6808C19.5999 17.2684 19.7237 17.9042 19.7938 18.5796C19.8635 19.2509 19.3286 19.8 18.6764 19.8H3.3235C2.67126 19.8 2.13639 19.2509 2.20607 18.5796C2.2762 17.9042 2.39992 17.2684 2.55483 16.6808Z" />
              </svg>
            </>
          ) : (
            <span className="text-nowrap shrink-0 text-12 hover:cursor-pointer">
              <Link to="/login">로그인</Link>
            </span>
          )}
        </div>
        <div className="block md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setIsMenuOpen(true)}
            className="stroke-main hover:cursor-pointer"
            strokeWidth="1.5"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" strokeWidth="1.5"></line>
            <line x1="3" y1="6" x2="21" y2="6" strokeWidth="1.5"></line>
            <line x1="3" y1="18" x2="21" y2="18" strokeWidth="1.5"></line>
          </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => setIsMenuOpen(false)}
                  className="stroke-main hover:cursor-pointer"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" strokeWidth="1.5"></line>
                  <line x1="6" y1="6" x2="18" y2="18" strokeWidth="1.5"></line>
                </svg>
              </div>
            </div>
            <div className="h-full px-20">
              <div className="flex flex-col w-full h-full">
                {isLogin ? (
                  <div className="flex flex-wrap items-center justify-between w-full px-20 py-10 break-keep shrink-0 min-h-60 rounded-15 bg-light-main">
                    <div className="flex items-center max-w-full py-10 shrink-0">
                      <svg
                        className="w-20 h-20 shrink-0 stroke-main fill-none hover:cursor-pointer"
                        viewBox="0 0 22 22"
                        strokeLinecap="round"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 10.2667C13.43 10.2667 15.4 8.29673 15.4 5.86667C15.4 3.43662 13.43 1.46667 11 1.46667C8.56992 1.46667 6.59998 3.43662 6.59998 5.86667C6.59998 8.29673 8.56992 10.2667 11 10.2667Z"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M2.55483 16.6808C3.31031 13.8153 6.17527 12.4667 9.0454 12.4667H12.9545C15.8246 12.4667 18.6896 13.8153 19.4451 16.6808C19.5999 17.2684 19.7237 17.9042 19.7938 18.5796C19.8635 19.2509 19.3286 19.8 18.6764 19.8H3.3235C2.67126 19.8 2.13639 19.2509 2.20607 18.5796C2.2762 17.9042 2.39992 17.2684 2.55483 16.6808Z"
                          strokeWidth="1.5"
                        />
                      </svg>
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
                    <div className="flex items-center justify-between w-full px-20 shrink-0 min-h-60 rounded-15 bg-light-main hover:cursor-pointer">
                      <div className="flex items-center">
                        <svg
                          className="w-20 h-20 stroke-main fill-none hover:cursor-pointer"
                          viewBox="0 0 22 22"
                          strokeLinecap="round"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 10.2667C13.43 10.2667 15.4 8.29673 15.4 5.86667C15.4 3.43662 13.43 1.46667 11 1.46667C8.56992 1.46667 6.59998 3.43662 6.59998 5.86667C6.59998 8.29673 8.56992 10.2667 11 10.2667Z"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M2.55483 16.6808C3.31031 13.8153 6.17527 12.4667 9.0454 12.4667H12.9545C15.8246 12.4667 18.6896 13.8153 19.4451 16.6808C19.5999 17.2684 19.7237 17.9042 19.7938 18.5796C19.8635 19.2509 19.3286 19.8 18.6764 19.8H3.3235C2.67126 19.8 2.13639 19.2509 2.20607 18.5796C2.2762 17.9042 2.39992 17.2684 2.55483 16.6808Z"
                            strokeWidth="1.5"
                          />
                        </svg>
                        <span className="ml-10">로그인이 필요합니다.</span>
                      </div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#000000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 18l6-6-6-6" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                )}
                <ul className="px-20 pb-40 text-20 sm:text-25">
                  <Link to={"/storage"} onClick={() => setIsMenuOpen(false)}>
                    <li className="py-10 mt-30 hover:text-main">
                      <span>와인창고</span>
                    </li>
                  </Link>
                  <Link to={"/place"} onClick={() => setIsMenuOpen(false)}>
                    <li className="py-10 mt-30 hover:text-main">
                      <span>주변와인</span>
                    </li>
                  </Link>
                  {isLogin ? (
                    <Link to={"/place"} onClick={() => setIsMenuOpen(false)}>
                      <li className="py-10 mt-30 hover:text-main">
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
          <HeaderNav text="주변와인" link="place" />
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
      <div className="flex items-center h-full hover:cursor-pointer border-y-2 border-y-white hover:border-b-main hover:text-main">
        <span className="text-nowrap">
          <Link to={`/${link}`}>{text}</Link>
        </span>
      </div>
    </li>
  );
};

export default Header;
