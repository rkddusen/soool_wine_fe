/**
 * features/Auth/My/hooks/usePatchPassword.ts
 * 이메일을 전송하는 커스텀 훅
 * 서버에서는 이메일을 확인하고, 사용 가능한 이메일이라면 해당 이메일로 인증 코드를 보냄
 * - mutation 반환
 */
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { patchPassword } from "../api";

interface VerifyRequestData {
  oldPassword: string;
  newPassword: string;
}

export const usePatchPassword = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (err: AxiosError) => void;
}) => {
  return useMutation<void, AxiosError, VerifyRequestData>({
    mutationFn: ({ oldPassword, newPassword }) =>
      patchPassword(oldPassword, newPassword),
    onSuccess,
    onError,
  });
};
