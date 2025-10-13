// SignUp/api.ts
import { SignUp } from "@/models/auth/User";
import { userInstance } from "@/apis/instance";

export const getIdExists = async (id: string): Promise<boolean> => {
  const { data } = await userInstance.get<boolean>(`/id-exists?id=${id}`);
  return data;
};

export const postUsers = async (user: SignUp): Promise<void> => {
  await userInstance.post<void>(`/`, {
    id: user.id,
    password: user.password,
    email: user.email,
  });
};
