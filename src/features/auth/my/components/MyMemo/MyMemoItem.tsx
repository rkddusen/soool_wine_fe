// MyMemo/MyMemoItem.tsx
// 내 메모들의 각 요소를 보여주는 컴포넌트
import { Link } from "react-router-dom";
import { UseMutationResult } from "@tanstack/react-query";
import { deleteMemoRequestData } from "@/hooks/memo/useDeleteMemo";
import { formatDate } from "@/utils/formatDate";
import { MyMemo } from "@/models/Memo";
import { ChevronRightIcon, TrashIcon } from "@heroicons/react/24/outline";

interface MyMemoItemProps {
  memoData: MyMemo;
  deleteMutation: UseMutationResult<void, Error, deleteMemoRequestData>;
}

const MyMemoItem = ({ memoData, deleteMutation }: MyMemoItemProps) => {
  const handleDelete = () => {
    if (window.confirm("메모를 삭제하시겠습니까?")) {
      deleteMutation.mutate({
        wineId: memoData.wineId,
        memoId: memoData.memoId,
      });
    }
  };
  return (
    <li className="rounded-15 overflow-hidden mb-20">
      {/* 와인 정보 */}
      <Link to={`/wine/${memoData.wineId}`}>
        <div className="h-120 bg-(--gray-e0) flex items-center p-10">
          <img
            src={memoData.wineImage ?? undefined}
            className="h-full aspect-square shrink-0"
          />
          <div className="w-full">
            <p className="md:text-20 text-16 leading-[120%] font-light mb-5 line-clamp-2">
              {memoData.wineEname}
            </p>
            <p className="md:text-16 text-14 leading-[120%] line-clamp-2">
              {memoData.wineKname}
            </p>
          </div>
          <ChevronRightIcon className="shrink-0 w-30 h-30 p-5" />
        </div>
      </Link>
      {/* 메모 내용 */}
      <div className="p-20 border rounded-b-15 border-(--gray-e0)">
        <div className="flex items-center justify-between">
          <p className="text-12">{formatDate(memoData.date)}</p>
          <div
            onClick={handleDelete}
            className="flex items-center justify-center rounded-full cursor-pointer w-32 h-32 hover:bg-red-100"
          >
            <TrashIcon className="w-18 h-18 stroke-red-600" />
          </div>
        </div>
        <p className="leading-20 mt-5 whitespace-pre-wrap">{memoData.memo}</p>
      </div>
    </li>
  );
};

export default MyMemoItem;
