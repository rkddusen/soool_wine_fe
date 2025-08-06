import { User } from "@/models/User";
import { authInstance, privateAuthInstance } from "@/utils/api";

interface LoginResponse {
  accessToken: string;
}

export const postLogin = async (
  id: string,
  password: string
): Promise<LoginResponse> => {
  const { data } = await authInstance.post<LoginResponse>(
    `/login`,
    {
      id,
      password,
    },
    {
      withCredentials: true,
    }
  );
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await privateAuthInstance.get<User>(`/me`);
  return data;
};
