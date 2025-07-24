/**
 * features/signup/hooks/useCode.ts
 * 인증 코드를 전송하는 커스텀 훅
 * - mutation 반환
 */
import { useMutation } from "@tanstack/react-query";
import { postCode } from "../api";
import { AxiosError } from "axios";

interface VerifyRequestData {
  token: string;
  email: string;
  code: number;
}

export const useCode = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (err: AxiosError) => void;
}) => {
  return useMutation<void, AxiosError, VerifyRequestData>({
    mutationFn: ({ code, token, email }) => postCode(code, token, email),
    onSuccess,
    onError,
  });
};
