// Memo/item/MemoItem.tsx
// 와인 메모 리스트의 항목을 나타내는 컴포넌트
import { useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { Memo } from "@/models/Memo";
import EditableMemoInput from "./EditableMemoInput";
import { formatDate } from "@/utils/formatDate";
import { patchMemoRequestData } from "../../../hooks/usePatchMemo";
import { deleteMemoRequestData } from "@/hooks/memo/useDeleteMemo";
import LoadingBlack from "@/assets/LoadingBlack.svg?react";
import {
  PencilSquareIcon,
  TrashIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

interface MemoItemProps {
  wineId: number;
  // 메모 수정 요청
  patchMutation: UseMutationResult<Memo, Error, patchMemoRequestData>;
  // 메모 삭제 요청
  deleteMutation: UseMutationResult<void, Error, deleteMemoRequestData>;
  // 메모
  memoData: Memo;
  // 저장한 메모에 오류가 생겼을 때 재시도
  onSave: (memo: string, clientId: string) => void;
}
const MemoItem = ({
  wineId,
  patchMutation,
  deleteMutation,
  memoData,
  onSave,
}: MemoItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedMemo, setEditedMemo] = useState<string>("");

  const handleEdit = (memo: string) => {
    patchMutation.mutate({
      wineId,
      memoId: memoData.memoId,
      memo,
      clientId: memoData.clientId,
    });
    setIsEditing(false);
    setEditedMemo(memo);
  };
  const handleDelete = () => {
    if (window.confirm("메모를 삭제하시겠습니까?")) {
      deleteMutation.mutate({ wineId, memoId: memoData.memoId });
    }
  };

  const handleRetry = (type: number, memo: string, clientId: string) => {
    // 저장 다시하기
    if (type === -1) {
      onSave(memo, clientId);
    }
    // 수정 다시하기
    else if (type === -2) {
      handleEdit(editedMemo);
    }
  };

  return (
    <div className="w-full px-10 py-20">
      <div className="flex items-center justify-between">
        {/* 날짜 or 오류 시 경고 아이콘 */}
        {memoData.memoId < 0 ? (
          <ExclamationTriangleIcon className="w-18 h-18 stroke-red-500" />
        ) : (
          <p className="text-12">{formatDate(memoData.date)}</p>
        )}
        {memoData.memoId >= 0 &&
          (memoData.memoId > 0 ? (
            <div className="h-full px-10 flex">
              {/* 메모 편집 */}
              <div
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center rounded-full cursor-pointer w-32 h-32 hover:bg-(--gray-e0)"
              >
                <PencilSquareIcon className="w-18 h-18" />
              </div>
              {/* 메모 삭제 */}
              <div
                onClick={handleDelete}
                className="flex items-center justify-center rounded-full cursor-pointer w-32 h-32 hover:bg-red-100"
              >
                <TrashIcon className="w-18 h-18 stroke-red-600" />
              </div>
            </div>
          ) : (
            <div className="mx-10 flex items-center justify-center rounded-full cursor-pointer w-32 h-32">
              <LoadingBlack stroke="black" className="w-18 h-18" />
            </div>
          ))}
      </div>
      {isEditing ? (
        <EditableMemoInput
          initialMemo={memoData.memo}
          onUpdate={handleEdit}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        // 본문
        <p className="leading-20 mt-5 whitespace-pre-wrap">{memoData.memo}</p>
      )}
      {memoData.memoId < 0 && (
        <div className="mt-10 flex items-center gap-10">
          <p className="text-14 text-red-500">저장 중 문제가 발생했습니다.</p>
          <button
            onClick={() =>
              handleRetry(memoData.memoId, memoData.memo, memoData.clientId)
            }
            className="text-12 bg-(--gray-f0) px-12 py-8 rounded-5"
          >
            재시도
          </button>
        </div>
      )}
    </div>
  );
};

export default MemoItem;
