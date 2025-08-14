/**
 * hooks/auth/useLogout.ts
 * 로그아웃을 처리하는 커스텀 훅
 * - postLogout 함수 호출
 */
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { AxiosError } from "axios";

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);

  // POST 로그아웃
  const mutation = useMutation<void, AxiosError, void>({
    mutationFn: logout,
  });

  return {
    logoutMutation: mutation.mutate,
  };
};
