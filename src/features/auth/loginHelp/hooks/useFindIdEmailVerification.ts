/**
 * features/loginHelp/hooks/useFindIdEmailVerification.ts
 * 이메일을 전송하는 커스텀 훅
 * 서버에서는 이메일을 확인하고, 등록된 이메일이라면 해당 이메일로 인증 코드를 보냄
 * - mutation 반환
 */
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/models/ApiError";
import { postFindIdEmailVerification } from "../api";

export const useFindIdEmailVerification = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: string) => void;
  onError: (err: AxiosError<ApiErrorResponse>) => void;
}) => {
  return useMutation<string, AxiosError<ApiErrorResponse>, string>({
    mutationFn: postFindIdEmailVerification,
    onSuccess,
    onError,
  });
};
