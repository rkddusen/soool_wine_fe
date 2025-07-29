// MobileNav.tsx
// 마이페이지의 메뉴를 보여주는 컴포넌트
import { MYPAGE_MENU } from "@/constants/Menu";

// 각 메뉴를 클릭하면 해당 화면을 보여줌
interface NavProps {
  mode: number;
  onClickMenu: (num: number) => void;
}
const Nav = ({ mode, onClickMenu }: NavProps) => {
  return (
    <div className="mx-auto fixed w-full bg-white">
      <ul className="flex gap-20 md:px-[max(40px,_calc((100vw-1220px)/2))] px-20 overflow-x-auto scrollbar-hide border-b border-(--gray-e0)">
        {MYPAGE_MENU.map((v, i) => (
          <li
            key={v}
            onClick={() => onClickMenu(i + 1)}
            className={`shrink-0 h-60 w-90 flex justify-center items-center text-center hover:cursor-pointer select-none ${
              mode === i + 1 && "font-medium border-b-2"
            }`}
          >
            <p>{v}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
