import { SignUp } from "@/models/auth/User";
import { userInstance } from "@/utils/api";

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
