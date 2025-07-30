import { privateUserInstance } from "@/utils/api";

export const patchEmail = async (
  code: number,
  email: string
): Promise<void> => {
  await privateUserInstance.patch<void>(`me/email`, {
    email,
    code,
  });
};
