import { userInstance } from "@/utils/api";

interface EmailVerificationResponse {
  token: string;
}
export const postEmailVerification = async (email: string): Promise<string> => {
  const { data } = await userInstance.post<EmailVerificationResponse>(
    `/email-verification`,
    { email }
  );
  return data.token;
};
