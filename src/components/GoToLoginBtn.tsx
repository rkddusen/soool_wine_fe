// components/GoToLoginBtn.tsx
import { useLocation, useNavigate } from "react-router-dom";

const GoToLoginBtn = ({ width, height }: { width: number; height: number }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = () => {
    const currentPath = location.pathname + location.search;
    navigate(`/login?url=${encodeURIComponent(currentPath)}`);
  };

  return (
    <button
      className="rounded-15 bg-(--gray-e0) hover:cursor-pointer text-12"
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={handleClick}
    >
      로그인
    </button>
  );
};

export default GoToLoginBtn;
