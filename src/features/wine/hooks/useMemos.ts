/**
 * features/Wine/hooks/useMemos.ts
 * 와인 아이디로 해당 와인의 메모를 가져오고 저장, 수정, 삭제하는 커스텀 훅
 * - 캐시 키: ["wine-memos"]
 * - get 요청 성공 시 string[] 반환
 * - post 함수 반환
 * - patch 함수 반환
 * - delete 함수 반환
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Memo } from "@/models/Memo";
import { useAuthStore } from "@/stores/authStore";
import { getMemo, postMemo } from "../api";

interface postMemoRequestData {
  memo: string;
  clientId: string;
}

export const useMemos = (wineId: number) => {
  const queryClient = useQueryClient();
  const queryKey = ["wine-memos", wineId];
  const user = useAuthStore((state) => state.user);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

  // GET 와인 메모
  // 로그인된 상태가 아니라면 GET 요청 X
  const { data, isLoading, isError, refetch } = useQuery<Memo[]>({
    queryKey,
    queryFn: () => getMemo(wineId),
    enabled: !isNaN(wineId) && !!user && !isAuthLoading,
  });

  // POST 와인 메모
  const mutation = useMutation<Memo, Error, postMemoRequestData>({
    mutationFn: ({ memo, clientId }) => postMemo(wineId, memo, clientId),
    // Optimistic Update
    onMutate: async (newData): Promise<{ previousData?: Memo[] }> => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<Memo[]>(queryKey);
      // 임시 값을 포함하여 등록
      const optimisticMemo: Memo = {
        memoId: 0,
        memo: newData.memo,
        date: "-",
        // 멱등성을 위한 키
        // api 통신에 오류가 생겼을 때 db에 데이터가 정상 등록됐는지 여부를 모름
        // 그렇기 때문에 clientId로 비교하여 사용자가 [재시도]했을 때 중복으로 데이터가 등록되는 것을 방지
        clientId: newData.clientId,
      };

      queryClient.setQueryData<Memo[]>(queryKey, (old) => {
        if (!old) return [optimisticMemo];

        const exists = old.some((item) => item.clientId === newData.clientId);

        if (exists) {
          // (재시도) 같은 clientId가 있으면 해당 항목 덮어쓰기
          return old.map((item) =>
            item.clientId === newData.clientId ? optimisticMemo : item
          );
        } else {
          // 추가
          return [...old, optimisticMemo];
        }
      });

      return { previousData };
    },
    onSuccess: (savedData: Memo) => {
      // 성공하면 임시 값 다 덮어씌우기
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
      console.log("Error postMemo:", error);

      queryClient.setQueryData<Memo[]>(queryKey, (old) => {
        if (!old) return old;
        return old.map((memo) =>
          memo.clientId === variables.clientId
            ? { ...memo, memoId: -1 } // 실패 표시
            : memo
        );
      });
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    memoMutation: mutation,
  };
};
