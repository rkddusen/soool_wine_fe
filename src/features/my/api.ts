import { userInstance } from "@/utils/api";

export const patchEmail = async (
  code: number,
  token: string,
  email: string
): Promise<void> => {
  await userInstance.patch<void>(`/email`, {
    token,
    email,
    code,
  });
};
