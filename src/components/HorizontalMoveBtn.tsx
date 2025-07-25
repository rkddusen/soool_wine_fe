// components/HorizontalMoveBtn.tsx
// 가로 스크롤 이동 버튼
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface HorizontalMoveBtnProps {
  // 버튼 클릭 시 실행되는 핸들러
  onClick: () => void;
  // 버튼 활성화 여부
  isActive: boolean;
  // 버튼 방향
  direction: "left" | "right";
}

const HorizontalMoveBtn = ({
  onClick,
  isActive,
  direction,
}: HorizontalMoveBtnProps) => {
  // direction에 따라 아이콘 결정
  const Icon = direction === "left" ? ChevronLeftIcon : ChevronRightIcon;
  return (
    <button
      onClick={onClick}
      disabled={!isActive}
      className={`w-40 h-40 rounded-full flex justify-center items-center ${
        isActive
          ? "bg-(--gray-e0) hover:bg-(--gray-c0) cursor-pointer"
          : "bg-(--gray-f0)"
      }`}
    >
      {/* 방향에 맞는 icon */}
      <Icon
        className={`w-18 h-18 ${
          isActive ? "stroke-black" : "stroke-(--gray-c0)"
        }`}
      />
    </button>
  );
};

export default HorizontalMoveBtn;
