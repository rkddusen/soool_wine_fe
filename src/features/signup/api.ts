import { SignUp } from "@/models/User";
import { userInstance } from "@/utils/api";

export const getIdExists = async (id: string): Promise<boolean> => {
  const { data } = await userInstance.get<boolean>(`/id-exists?id=${id}`);
  return data;
};

export const postCode = async (
  code: number,
  token: string,
  email: string
): Promise<void> => {
  await userInstance.post<void>(`/email-verification/verify`, {
    token,
    email,
    code,
  });
};

export const postUsers = async (user: SignUp): Promise<void> => {
  await userInstance.post<void>(`/`, {
    id: user.id,
    password: user.password,
    email: user.email,
  });
};
