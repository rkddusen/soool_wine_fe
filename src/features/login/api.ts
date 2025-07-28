import { User } from "@/models/User";
import { userInstance } from "@/utils/api";

interface LoginResponse {
  accessToken: string;
}

export const postLogin = async (
  id: string,
  password: string
): Promise<LoginResponse> => {
  const { data } = await userInstance.post<LoginResponse>(`/auth/login`, {
    id,
    password,
  });
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await userInstance.get<User>(`/auth/me`);
  return data;
};
