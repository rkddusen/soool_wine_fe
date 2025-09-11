// Nav.tsx
// 로그인 헬프의 메뉴를 보여주는 컴포넌트
import { LOGINHELP_MENU } from "@/constants/Menu";

// 각 메뉴를 클릭하면 해당 화면을 보여줌
interface NavProps {
  mode: number;
  onClickMenu: (num: number) => void;
}
const Nav = ({ mode, onClickMenu }: NavProps) => {
  return (
    <div className="mx-auto w-full bg-white">
      <ul className="flex scrollbar-hide border-b border-(--gray-e0)">
        {LOGINHELP_MENU.map((v, i) => (
          <li
            key={v}
            onClick={() => onClickMenu(i + 1)}
            className={`h-60 w-full flex justify-center items-center text-center hover:cursor-pointer select-none ${
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
