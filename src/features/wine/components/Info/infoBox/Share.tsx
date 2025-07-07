// Info/infoBox/Share.tsx
// 와인 공유 버튼
import { ShareIcon } from "@heroicons/react/24/outline";

const Share = () => {
  return (
    <button
      className={`flex items-center justify-center w-full gap-10 px-10 rounded-15 hover:cursor-pointer bg-white`}
    >
      <ShareIcon className="w-20 h-20 shrink-0" />
      <p>공유</p>
    </button>
  );
};

export default Share;
