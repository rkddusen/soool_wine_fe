// Memo/Memo.tsx
// 와인 메모를 나타내는 컴포넌트
// 메모를 등록하고 표시
import { useState } from "react";
import useMeasure from "react-use-measure";
import { motion } from "framer-motion";
import LoadingBlack from "@/assets/LoadingBlack.svg?react";
import { useMutation } from "@tanstack/react-query";
import { postWineMemo } from "@/utils/api";
import toast from "react-hot-toast";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowPathIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface Props {
  wineId: number;
  memo: string[] | null;
  isWineMemoError: boolean;
  refetchWineMemo: () => void;
  isWineMemoLoading: boolean;
}
const Memo = ({
  wineId,
  memo,
  isWineMemoError,
  refetchWineMemo,
  isWineMemoLoading,
}: Props) => {
  const [isMemoOpen, setIsMemoOpen] = useState<boolean>(false);
  const [ref, { height }] = useMeasure();
  const [memoInput, setMemoInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const callPostWineMemo = async (memo: string): Promise<void> => {
    await postWineMemo(wineId, memo);
  };

  const mutation = useMutation<void, Error, string>({
    mutationFn: callPostWineMemo,
    onMutate: () => setLoading(true),
    onSuccess: () => setMemoInput(""),
    onError: (error) => {
      toast.error("서버와 문제가 생겼어요. 잠시 후 다시 시도해주세요.");
      console.log("Error postWineMemo:", error);
    },
    onSettled: () => {
      refetchWineMemo();
      setLoading(false);
    },
  });

  const handleSummitWineMemo = () => {
    mutation.mutate(memoInput);
  };

  return (
    <div className="px-20 mx-auto mt-20 md:px-40 md:max-w-1000 max-w-500">
      <button
        className="w-full h-50 bg-(--memo) rounded-15 flex gap-5 justify-center items-center select-none hover:cursor-pointer"
        onClick={() => setIsMemoOpen((prev) => !prev)}
      >
        <span>와인 메모</span>
        {isMemoOpen ? (
          <ChevronUpIcon className="w-20 h-20" />
        ) : (
          <ChevronDownIcon className="w-20 h-20" />
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
            <div className="flex items-center justify-center">
              {isWineMemoLoading || loading ? (
                <div className="py-50">
                  <LoadingBlack stroke="black"></LoadingBlack>
                </div>
              ) : (
                <>
                  {memo ? (
                    <ul className="w-full">
                      {memo.map((v, i) => (
                        <li key={i}>
                          {i !== 0 && (
                            <div className="h-1 bg-(--gray-e0)"></div>
                          )}
                          <div className="flex items-center justify-start">
                            <p className="w-full px-10 py-20 leading-20">{v}</p>
                            <div className="h-full px-10">
                              <div className="flex items-center justify-center rounded-full cursor-pointer w-36 h-36 hover:bg-red-100">
                                <TrashIcon className="w-20 h-20 stroke-red-600" />
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <>
                      {isWineMemoError ? (
                        <div className="py-50">
                          <button
                            onClick={refetchWineMemo}
                            className="flex items-center justify-center w-36 h-36 mx-auto rounded-full bg-(--gray-e0) cursor-pointer"
                          >
                            <ArrowPathIcon className="w-18 h-18" />
                          </button>
                          <p className="text-14 mt-15">
                            오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
                          </p>
                        </div>
                      ) : (
                        <p className="py-50 text-14">
                          "해당 와인에 작성된 메모가 없습니다!"
                        </p>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
            <div className="mt-10 px-8 py-8 border border-(--gray-bb) rounded-5">
              <textarea
                rows={3}
                className="w-full resize-none outline-0"
                value={memoInput}
                onChange={(e) => setMemoInput(e.target.value)}
                placeholder="메모를 작성해주세요:)"
              ></textarea>
              <div className="flex justify-end mt-10">
                <button
                  onClick={handleSummitWineMemo}
                  className="bg-(--memo) px-20 py-10 rounded-5 select-none hover:cursor-pointer text-14"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Memo;
