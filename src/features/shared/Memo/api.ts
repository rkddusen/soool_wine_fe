// features/shared/Memo/api.ts
// 메모 관련 공통 API 호출을 담당
import { privateUserInstance } from "@/apis/instance";

export const deleteMemo = async (
  wineId: number,
  memoId: number
): Promise<void> => {
  await privateUserInstance.delete<void>(`me/wines/${wineId}/memos/${memoId}`);
};
