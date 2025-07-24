/**
 * features/signup/hooks/useSignUp.ts
 * 회원가입을 요청하는 커스텀 훅
 * - mutation 반환
 */
import { useMutation } from "@tanstack/react-query";
import { postUsers } from "../api";
import { AxiosError } from "axios";
import { User } from "@/models/User";

export const useSignUp = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (err: AxiosError) => void;
}) => {
  return useMutation<void, AxiosError, User>({
    mutationFn: postUsers,
    onSuccess,
    onError,
  });
};
