/**
 * Signup/hooks/useSignUp.ts
 * 회원가입을 요청하는 커스텀 훅
 * - mutation 반환
 */
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postUsers } from "../api";
import { SignUp } from "@/models/auth/User";
import { ApiErrorResponse } from "@/models/ApiError";

export const useSignUp = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (err: AxiosError<ApiErrorResponse>) => void;
}) => {
  return useMutation<void, AxiosError<ApiErrorResponse>, SignUp>({
    mutationFn: postUsers,
    onSuccess,
    onError,
  });
};
