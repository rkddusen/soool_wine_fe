// Memo/MemoInput.tsx
// 와인 메모 작성 폼을 나타내는 컴포넌트
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface MemoInputProps {
  onSave: (memo: string, clientId: string) => void;
  isDisabled?: boolean;
}

const MemoInput = ({ onSave, isDisabled }: MemoInputProps) => {
  const [memo, setMemo] = useState<string>("");
  const handleSave = () => {
    onSave(memo, uuidv4());
    setMemo("");
  };
  return (
    <div className="mt-10 px-8 py-8 border border-(--gray-bb) rounded-5 shrink-0">
      <textarea
        rows={4}
        className="w-full resize-none outline-0"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="메모를 작성해주세요!"
      ></textarea>
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={!memo.trim() || isDisabled}
          className="bg-(--memo) px-20 py-10 rounded-5 select-none hover:cursor-pointer text-14"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default MemoInput;
