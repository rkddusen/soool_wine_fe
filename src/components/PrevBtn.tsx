// components/PrevBtn.tsx
interface PrevBtnProps {
  onClick: () => void;
}

const PrevBtn = ({ onClick }: PrevBtnProps) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-1 items-center justify-center rounded-15 border border-(--gray-49) hover:cursor-pointer"
    >
      <span>이전</span>
    </div>
  );
};

export default PrevBtn;
