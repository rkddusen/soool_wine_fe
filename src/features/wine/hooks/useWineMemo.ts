/**
 * features/main/hooks/useWineMemo.ts
 * 와인 아이디로 해당 와인의 메모를 가져오고 저장하는 커스텀 훅
 * - 캐시 키: ["wine-memo"]
 * - get 요청 성공 시 string[] 반환
 * - post 함수 반환
 */
import { useQuery, useMutation } from "@tanstack/react-query";
import { getWineMemo, postWineMemo } from "../api";
import toast from "react-hot-toast";

export const useWineMemo = (id: number) => {
  // GET 와인 메모
  const { data, isLoading, isError, refetch } = useQuery<string[]>({
    queryKey: ["wine-memo", id],
    queryFn: () => getWineMemo(id),
    enabled: !isNaN(id),
  });

  // POST 와인 메모
  const mutation = useMutation<void, Error, string>({
    mutationFn: (input) => postWineMemo(id, input),
    onError: (error) => {
      toast.error("서버와 문제가 생겼어요. 잠시 후 다시 시도해주세요.");
      console.log("Error postWineMemo:", error);
    },
    // 성공, 실패 시 둘 다 refetch
    onSettled: () => {
      refetch();
    },
  });

  return {
    data,
    isLoading: isLoading || mutation.isPending,
    isError,
    refetch,
    WineMemoMutation: mutation.mutate,
  };
};
