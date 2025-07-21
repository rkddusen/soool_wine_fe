import { userInstance } from "@/utils/api";

interface LoginTokenResponse {
  token: string;
}

export const postLogin = async (
  id: string,
  password: string
): Promise<string> => {
  const { data } = await userInstance.post<LoginTokenResponse>(`/auth/login`, {
    id,
    password,
  });
  return data.token;
};
