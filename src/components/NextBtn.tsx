import LoadingWhite from "/src/assets/LoadingWhite.svg?react";

interface NextBtnProps {
  isLoading?: boolean;
  onClick: () => void;
  isActive?: boolean;
  text: string;
}

const NextBtn = ({
  isLoading = false,
  onClick,
  isActive = true,
  text,
}: NextBtnProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || !isActive}
      className={`${
        isActive
          ? "bg-(--gray-49) cursor-pointer"
          : "bg-(--gray-e0) cursor-default"
      } flex flex-3 items-center justify-center rounded-15`}
    >
      {isLoading ? (
        <LoadingWhite />
      ) : (
        <span className="text-white">{text}</span>
      )}
    </button>
  );
};

export default NextBtn;
