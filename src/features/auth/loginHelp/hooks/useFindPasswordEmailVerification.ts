/**
 * features/Auth/LoginHelp/hooks/useFindPasswordEmailVerification.ts
 * 이메일을 전송하는 커스텀 훅
 * 서버에서는 아이디와 이메일을 확인하고, 해당 아이디에 등록된 이메일이라면 이메일로 인증 코드를 보냄
 * - mutation 반환
 */
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/models/ApiError";
import { postFindPasswordEmailVerification } from "../api";

interface VerificationRequestData {
  id: string;
  email: string;
}

export const useFindPasswordEmailVerification = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: string) => void;
  onError: (err: AxiosError<ApiErrorResponse>) => void;
}) => {
  return useMutation<
    string,
    AxiosError<ApiErrorResponse>,
    VerificationRequestData
  >({
    mutationFn: ({ id, email }) => postFindPasswordEmailVerification(id, email),
    onSuccess,
    onError,
  });
};
