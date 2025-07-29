/**
 * features/my/hooks/useChangeEmail.ts
 * 이메일을 전송하는 커스텀 훅
 * 서버에서는 이메일을 확인하고, 사용 가능한 이메일이라면 해당 이메일로 인증 코드를 보냄
 * - mutation 반환
 */
import { useMutation } from "@tanstack/react-query";
import { patchEmail } from "../api";
import { AxiosError } from "axios";

interface VerifyRequestData {
  token: string;
  email: string;
  code: number;
}

export const useChangeEmail = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (err: AxiosError) => void;
}) => {
  return useMutation<void, AxiosError, VerifyRequestData>({
    mutationFn: ({ code, token, email }) => patchEmail(code, token, email),
    onSuccess,
    onError,
  });
};
