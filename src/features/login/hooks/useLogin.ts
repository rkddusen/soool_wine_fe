/**
 * features/login/hooks/useLogin.ts
 * 아이디와 비밀번호로 로그인하는 커스텀 훅
 * - post 함수 반환
 */
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../api";

interface loginInput {
  id: string;
  password: string;
}

export const useLogin = () => {
  // POST 로그인
  const mutation = useMutation<string, Error, loginInput>({
    mutationFn: ({ id, password }) => postLogin(id, password),
  });

  return {
    isLoading: mutation.isPending,
    loginMutation: mutation.mutate,
  };
};
