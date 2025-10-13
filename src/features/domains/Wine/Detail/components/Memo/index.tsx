// Memo/index.tsx
// 와인 메모를 나타내는 컴포넌트
// 메모를 등록하고 표시
import { useState } from "react";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";
import { useAuthStore } from "@/stores/authStore";
import MemoItem from "./MemoItem";
import MemoInput from "./MemoInput";
import { GoToLoginBtn } from "@/components";
import { useMemos } from "../../hooks/useMemos";
import { usePatchMemo } from "../../hooks/usePatchMemo";
import { useDeleteMemo } from "@/features/shared/Memo/hooks/useDeleteMemo";
import LoadingBlack from "@/assets/LoadingBlack.svg?react";
import {
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

interface MemoProps {
  // 와인 아이디
  wineId: number;
}
const Memo = ({ wineId }: MemoProps) => {
  const user = useAuthStore((state) => state.user);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
  const [isMemoOpen, setIsMemoOpen] = useState<boolean>(false);
  const [ref, { height }] = useMeasure();
  const queryKey = ["wine-memos", wineId];

  const {
    data: memos,
    isLoading,
    isError,
    refetch,
    memoMutation,
  } = useMemos(wineId);
  const patchMutation = usePatchMemo(queryKey);
  const deleteMutation = useDeleteMemo(queryKey);

  // 메모 저장
  const handleSave = (memo: string, clientId: string) => {
    if (!memo.trim()) {
      return;
    }
    memoMutation.mutate({ memo, clientId });
  };

  return (
    <div className="px-20 mx-auto mt-20 md:px-40 md:max-w-1000 max-w-500">
      <button
        className="w-full h-50 bg-(--memo) rounded-15 flex gap-5 justify-center items-center select-none hover:cursor-pointer"
        onClick={() => setIsMemoOpen((prev) => !prev)}
      >
        <span>와인 메모</span>
        {isMemoOpen ? (
          <ChevronUpIcon className="w-18 h-18" />
        ) : (
          <ChevronDownIcon className="w-18 h-18" />
        )}
      </button>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isMemoOpen ? height : 0 }}
        transition={{ duration: 0.2 }}
        style={{ overflow: "hidden" }}
      >
        <div ref={ref} className="py-10">
          <div className="px-20 py-20 bg-white rounded-15">
            {isAuthLoading || !user ? (
              <div className="text-center py-50">
                <p className="pb-10">로그인이 필요합니다!</p>
                <GoToLoginBtn width={80} height={32} />
              </div>
            ) : (
              <div>
                {isLoading ? (
                  <LoadingBlack stroke="black" className="mx-auto my-50" />
                ) : (
                  <>
                    {isError ? (
                      <div className="my-20 text-center">
                        <button
                          onClick={() => refetch()}
                          className="flex items-center justify-center w-36 h-36 mx-auto rounded-full bg-(--gray-e0) cursor-pointer"
                        >
                          <ArrowPathIcon className="w-18 h-18" />
                        </button>
                        <p className="text-14 mt-15">
                          오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
                        </p>
                      </div>
                    ) : (
                      <>
                        {memos?.length ? (
                          <ul>
                            {memos.map((memoData, idx) => (
                              <li key={memoData.clientId}>
                                {idx !== 0 && (
                                  <div className="h-1 bg-(--gray-e0)"></div>
                                )}
                                <MemoItem
                                  wineId={wineId}
                                  patchMutation={patchMutation}
                                  deleteMutation={deleteMutation}
                                  memoData={memoData}
                                  onSave={handleSave}
                                />
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="py-50 text-14 text-center">
                            해당 와인에 작성된 메모가 없습니다!
                          </p>
                        )}
                        <MemoInput onSave={handleSave} isDisabled={isError} />
                        <p className="mt-10 text-12 text-(--gray-49)">
                          * 메모는 와인 당 최대 100개까지 가능합니다.
                        </p>
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Memo;
