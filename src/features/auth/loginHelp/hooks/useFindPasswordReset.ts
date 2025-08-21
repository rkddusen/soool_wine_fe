/**
 * features/loginHelp/hooks/auth/useFindPasswordReset.ts
 * 새 비밀번호를 등록하는 커스텀 훅
 * - mutation 반환
 */
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/models/ApiError";
import { patchFindPasswordReset } from "../api";

interface VerifyRequestData {
  id: string;
  newPassword: string;
}

export const useFindPasswordReset = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (err: AxiosError<ApiErrorResponse>) => void;
}) => {
  return useMutation<void, AxiosError<ApiErrorResponse>, VerifyRequestData>({
    mutationFn: ({ id, newPassword }) =>
      patchFindPasswordReset(id, newPassword),
    onSuccess,
    onError,
  });
};
