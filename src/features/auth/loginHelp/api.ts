// features/Auth/LoginHelp/api.ts
import { userInstance } from "@/apis/instance";

// 아이디 찾기
// 1. 이메일 인증 요청
interface TokenResponse {
  token: string;
}
export const postFindIdEmailVerification = async (
  email: string
): Promise<string> => {
  const { data } = await userInstance.post<TokenResponse>(
    `/find-id/email-verification`,
    { email }
  );
  return data.token;
};

// 2. 이메일 검증
export const postFindIdVerify = async (
  token: string,
  email: string,
  code: string
): Promise<string> => {
  const { data } = await userInstance.post<string>(`/find-id/verify`, {
    token,
    email,
    code,
  });
  return data;
};

// 비밀번호 찾기
// 1. 이메일 인증 요청
export const postFindPasswordEmailVerification = async (
  id: string,
  email: string
): Promise<string> => {
  const { data } = await userInstance.post<TokenResponse>(
    `/find-password/email-verification`,
    { id, email }
  );
  return data.token;
};

// 2. 이메일 검증
export const postFindPasswordVerify = async (
  token: string,
  id: string,
  email: string,
  code: string
): Promise<string> => {
  const { data } = await userInstance.post<TokenResponse>(
    `/find-password/verify`,
    {
      token,
      id,
      email,
      code,
    }
  );
  return data.token;
};

// 3. 새 비밀번호 등록
export const patchFindPasswordReset = async (
  id: string,
  newPassword: string,
  token: string
): Promise<void> => {
  await userInstance.patch<string>(`/find-password/reset`, {
    id,
    newPassword,
    token,
  });
  return;
};
