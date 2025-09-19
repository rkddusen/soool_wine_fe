// apis/userApi.ts
// 사용자 관련 공통 API 호출을 담당
import { authInstance, userInstance } from "@/apis/instance";

// 이메일 인증 요청
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

export const postCode = async (
  code: string,
  token: string,
  email: string
): Promise<void> => {
  await userInstance.post<void>(`/email-verification/verify`, {
    token,
    email,
    code,
  });
};

// 사용자 로그아웃
export const postLogout = async (): Promise<void> => {
  await authInstance.post(`/logout`, {}, { withCredentials: true });
};
