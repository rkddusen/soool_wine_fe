/**
 * features/Auth/LoginHelp/hooks/useFindPasswordVerify.ts
 * 인증 코드를 전송하는 커스텀 훅
 * - mutation 반환
 */
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/models/ApiError";
import { postFindPasswordVerify } from "../api";

interface VerifyRequestData {
  token: string;
  id: string;
  email: string;
  code: string;
}

export const useFindPasswordVerify = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: string) => void;
  onError: (err: AxiosError<ApiErrorResponse>) => void;
}) => {
  return useMutation<string, AxiosError<ApiErrorResponse>, VerifyRequestData>({
    mutationFn: ({ token, id, email, code }) =>
      postFindPasswordVerify(token, id, email, code),
    onSuccess,
    onError,
  });
};
