// WineType/TypeBtn.tsx
// 타입 버튼 컴포넌트
import WineIcon from "@/assets/WineIcon.svg?react";
import { TypeKey } from "@/models/Wine";

interface TypeBtnProps {
  // 와인 타입 이름 (ex. 레드 와인)
  name: string;
  // 와인 타입 (ex. red)
  type: TypeKey;
}

const TypeBtn = ({ name, type }: TypeBtnProps) => {
  return (
    <>
      <div className="relative rounded-full w-full pb-[100%]">
        <div
          className={`flex justify-center items-center absolute top-0 left-0 w-full h-full rounded-full group-hover:bg-(--gray-f5) bg-white overflow-hidden`}
        >
          <WineIcon
            className="h-24 w-18 sm:h-40 sm:w-30"
            style={{ fill: `var(--${type}-wine)` }}
          />
        </div>
      </div>
      <p className="flex justify-center mt-10 mb-5 text-12 sm:text-14 md:text-16 group-hover:font-extralight">
        {name}
      </p>
    </>
  );
};

export default TypeBtn;
