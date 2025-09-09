/**
 * hooks/memo/usePatchMemo.ts
 * 특정 메모를 수정하는 커스텀 훅
 * - 성공 시 mutation 반환
 */
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { patchMemo } from "@/apis/memoApi";
import { Memo } from "@/models/Memo";
import toast from "react-hot-toast";

export interface patchMemoRequestData {
  wineId: number;
  memoId: number;
  memo: string;
  clientId: string;
}

export const usePatchMemo = (queryKey: QueryKey) => {
  const queryClient = useQueryClient();
  // PATCH 와인 메모
  const mutation = useMutation<Memo, Error, patchMemoRequestData>({
    mutationFn: ({ wineId, memoId, memo }) => patchMemo(wineId, memoId, memo),
    onMutate: async (newData): Promise<{ previousData?: Memo[] }> => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<Memo[]>(queryKey);
      queryClient.setQueryData<Memo[]>(queryKey, (old) => {
        if (!old) return previousData;
        return old.map((item) =>
          item.clientId === newData.clientId
            ? { ...item, memo: newData.memo!, memoId: 0 }
            : item
        );
      });
      return { previousData };
    },
    onSuccess: (savedData: Memo) => {
      queryClient.setQueryData<Memo[]>(
        queryKey,
        (old) =>
          old?.map((memo) =>
            memo.clientId === savedData.clientId ? savedData : memo
          ) || []
      );
    },
    onError: (error, variables) => {
      toast.error("서버와 문제가 생겼어요. 잠시 후 다시 시도해주세요.");
      console.log("Error patchMemo:", error);

      queryClient.setQueryData<Memo[]>(queryKey, (old) => {
        if (!old) return old;
        return old.map((memo) =>
          memo.clientId === variables.clientId
            ? { ...memo, memoId: -2 } // 실패 표시
            : memo
        );
      });
    },
  });

  return mutation;
};
