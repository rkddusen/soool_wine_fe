import { useState } from "react";
import useMeasure from "react-use-measure";
import { motion } from "framer-motion";

interface WineMemoSectionProps {
  wineId: number;
  memo: string[] | null;
  isWineMemoError: boolean;
  refetchWineMemo: () => void;
}
const WineMemoSection = ({
  wineId,
  memo,
  isWineMemoError,
  refetchWineMemo,
}: WineMemoSectionProps) => {
  const [isMemoOpen, setIsMemoOpen] = useState<boolean>(false);
  const [ref, { height }] = useMeasure();

  return (
    <div className="px-20 mx-auto mt-20 md:px-40 md:max-w-1000 max-w-500">
      <div
        className="w-full h-50 bg-(--memo) rounded-15 flex gap-5 justify-center items-center select-none hover:cursor-pointer"
        onClick={() => setIsMemoOpen((prev) => !prev)}
      >
        <span>와인 메모</span>

        <svg
          className="w-20 h-20 fill-none stroke-black"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isMemoOpen ? (
            <path d="M18 15l-6-6-6 6" />
          ) : (
            <path d="M6 9l6 6 6-6" />
          )}
        </svg>
      </div>
      <motion.div
        animate={{ height: isMemoOpen ? height : 0 }}
        transition={{ duration: 0.2 }}
        style={{ overflow: "hidden" }}
      >
        <div ref={ref} className="py-10">
          <div className="px-20 py-20 bg-white rounded-15">
            <div className="flex items-center justify-center">
              {memo ? (
                <ul className="w-full">
                  {memo.map((v, i) => (
                    <li key={i}>
                      {i !== 0 && <div className="h-1 bg-(--gray-e0)"></div>}
                      <div className="flex items-center justify-start">
                        <p className="w-full px-10 py-20 leading-20">{v}</p>
                        <div className="h-full px-10">
                          <div className="flex items-center justify-center rounded-full cursor-pointer w-36 h-36 hover:bg-red-100">
                            <svg
                              className="w-20 h-20 fill-none stroke-red-600 stroke-[1.5]"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-50">
                  {isWineMemoError
                    ? "오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
                    : "해당 와인에 작성된 메모가 없습니다!"}
                </p>
              )}
            </div>
            <div className="mt-10 px-8 py-8 border border-(--gray-bb) rounded-5">
              <textarea
                rows={3}
                className="w-full resize-none outline-0"
                placeholder="메모를 작성해주세요:)"
              ></textarea>
              <div className="flex justify-end mt-10">
                <div className="bg-(--memo) px-20 py-10 rounded-5 select-none hover:cursor-pointer">
                  저장
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WineMemoSection;
