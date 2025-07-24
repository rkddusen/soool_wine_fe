import { User } from "@/models/User";
import { userInstance } from "@/utils/api";

interface EmailVerificationResponse {
  token: string;
}

export const getIdExists = async (id: string): Promise<boolean> => {
  const { data } = await userInstance.get<boolean>(`/id-exists?id=${id}`);
  return data;
};

export const postEmail = async (email: string): Promise<string> => {
  const { data } = await userInstance.post<EmailVerificationResponse>(
    `/email-verification`,
    { email }
  );
  return data.token;
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

export const postUsers = async (user: User): Promise<void> => {
  await userInstance.post<void>(`/`, {
    id: user.id,
    password: user.password,
    email: user.email,
  });
};
