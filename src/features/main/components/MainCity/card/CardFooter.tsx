// MainCity/card/CardFooter.tsx
// 도시 카드(Footer)
import {
  ArrowRightIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";

interface Props {
  // 카드 앞/뒤 전환 핸들러
  onFlip(): void;
}
const CardFooter = ({ onFlip }: Props) => {
  return (
    <div className="flex h-40 gap-10">
      {/* '이 지역 와인 보기' 버튼 */}
      <button className="w-full h-full rounded-20 flex gap-5 justify-center items-center bg-[#D3E6BC] cursor-pointer hover:bg-[#C1D4AA]">
        <span className="text-nowrap text-14">이 지역 와인 보기</span>
        <ArrowRightIcon className="w-16 h-16" />
      </button>
      {/* 카드 앞/뒤 전환 버튼 */}
      <button
        onClick={onFlip}
        className="shrink-0 w-50 h-full rounded-20 bg-(--gray-f0) flex justify-center items-center cursor-pointer hover:bg-(--gray-e0)"
      >
        <ArrowsRightLeftIcon className="w-18 h-18" />
      </button>
    </div>
  );
};

export default CardFooter;
