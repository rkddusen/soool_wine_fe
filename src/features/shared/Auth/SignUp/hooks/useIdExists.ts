/**
 * Signup/hooks/useIdExists.ts
 * 아이디를 사용 여부를 가져오는 커스텀 훅
 * - mutation 반환
 */
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getIdExists } from "../api";

export const useIdExists = ({
  onSuccess,
  onError,
}: {
  onSuccess: (exists: boolean) => void;
  onError: (err: AxiosError) => void;
}) => {
  return useMutation<boolean, AxiosError, string>({
    mutationFn: getIdExists,
    onSuccess,
    onError,
  });
};
