// Memo/EditableMemoInput.tsx
// (수정 전용) 와인 메모 작성 폼을 나타내는 컴포넌트
import { useState } from "react";

interface EditableMemoInputProps {
  initialMemo: string;
  onUpdate: (memo: string) => void;
  onCancel: () => void;
}

const EditableMemoInput = ({
  initialMemo,
  onUpdate,
  onCancel,
}: EditableMemoInputProps) => {
  const [memo, setMemo] = useState<string>(initialMemo);
  const handleUpdate = () => {
    onUpdate(memo);
    setMemo("");
  };

  return (
    <div className="mt-10 px-8 py-8 border border-(--gray-bb) rounded-5">
      <textarea
        rows={4}
        className="w-full resize-none outline-0"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="메모를 작성해주세요!"
      ></textarea>
      <div className="flex justify-end gap-10">
        <button
          onClick={onCancel}
          className="hover:bg-(--gray-f5) px-20 py-10 rounded-5 select-none hover:cursor-pointer text-14"
        >
          취소
        </button>
        <button
          onClick={handleUpdate}
          disabled={!memo.trim()}
          className="bg-(--memo) px-20 py-10 rounded-5 select-none hover:cursor-pointer text-14"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default EditableMemoInput;
