/**
 * hooks/useShowError.ts
 * api 요청 시 발생하는 오류를 결정하는 커스텀 훅
 * 오류 반환
 */
import { ApiErrorResponse } from "@/models/ApiError";
import { AxiosError } from "axios";

export const useShowError = (
  error: AxiosError<ApiErrorResponse>,
  visibleCodes: readonly string[]
) => {
  if (!error.response)
    return { code: null, message: "문제가 발생했습니다. 다시 시도해주세요." };
  const { code, message } = error.response?.data;
  if (code && visibleCodes.includes(code) && message) {
    return { code, message };
  }
  return { code: null, message: "문제가 발생했습니다. 다시 시도해주세요." };
};
