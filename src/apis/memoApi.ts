import { Memo } from "@/models/Memo";
import { privateUserInstance } from "@/utils/api";

export const patchMemo = async (
  wineId: number,
  memoId: number,
  memo: string
): Promise<Memo> => {
  const { data } = await privateUserInstance.patch<Memo>(
    `me/wines/${wineId}/memos/${memoId}`,
    {
      memo,
    }
  );

  return data;
};

export const deleteMemo = async (
  wineId: number,
  memoId: number
): Promise<void> => {
  await privateUserInstance.delete<void>(`me/wines/${wineId}/memos/${memoId}`);
};
