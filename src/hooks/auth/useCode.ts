/**
 * hooks/auth/useCode.ts
 * 인증 코드를 전송하는 커스텀 훅
 * - mutation 반환
 */
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postCode } from "@/apis/userApi";
import { ApiErrorResponse } from "@/models/ApiError";

interface VerifyRequestData {
  token: string;
  email: string;
  code: string;
}

export const useCode = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (err: AxiosError<ApiErrorResponse>) => void;
}) => {
  return useMutation<void, AxiosError<ApiErrorResponse>, VerifyRequestData>({
    mutationFn: ({ code, token, email }) => postCode(code, token, email),
    onSuccess,
    onError,
  });
};
