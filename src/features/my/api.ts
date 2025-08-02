import { privateUserInstance } from "@/utils/api";

export const patchEmail = async (
  code: string,
  email: string
): Promise<void> => {
  await privateUserInstance.patch<void>(`me/email`, {
    email,
    code,
  });
};
export const patchPassword = async (
  oldPassword: string,
  newPassword: string
): Promise<void> => {
  await privateUserInstance.patch<void>(`me/password`, {
    oldPassword,
    newPassword,
  });
};
