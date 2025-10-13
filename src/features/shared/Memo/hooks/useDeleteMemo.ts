/**
 * features/shared/Memo/hooks/useDeleteMemo.ts
 * 특정 메모를 삭제하는 커스텀 훅
 * - 성공 시 mutation 반환
 */
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMemo } from "../api";
import toast from "react-hot-toast";

export interface deleteMemoRequestData {
  wineId: number;
  memoId: number;
}
export const useDeleteMemo = (queryKey: QueryKey) => {
  const queryClient = useQueryClient();
  // DELETE 와인 메모
  const mutation = useMutation<void, Error, deleteMemoRequestData>({
    mutationFn: ({ wineId, memoId }) => deleteMemo(wineId, memoId),
    onSuccess: () => {
      toast.success("메모가 삭제되었습니다.");
    },
    onError: (error) => {
      toast.error("서버와 문제가 생겼어요. 잠시 후 다시 시도해주세요.");
      console.log("Error deleteMemo:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return mutation;
};
