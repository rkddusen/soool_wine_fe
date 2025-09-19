/**
 * features/Auth/Login/hooks/useLogin.ts
 * 아이디와 비밀번호로 로그인하는 커스텀 훅
 * - post 함수 반환
 */
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/models/ApiError";

interface loginInput {
  id: string;
  password: string;
}

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);

  // POST 로그인
  const mutation = useMutation<void, AxiosError<ApiErrorResponse>, loginInput>({
    mutationFn: ({ id, password }) => login(id, password),
  });

  return {
    isLoading: mutation.isPending,
    loginMutation: mutation.mutate,
  };
};
