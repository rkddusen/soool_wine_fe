export const AUTH_ERROR_CODES = [
  "INVALID_EMAIL", // 아이디 찾기
  "INVALID_ID", // 비밀번호 찾기
  "USER_EMAIL_MISMATCH", // 비밀번호 찾기
  "WRONG_CODE", // 회원가입, 아이디 찾기, 비밀번호 찾기, 이메일 수정
  "SAME_PASSWORD", // 비밀번호 찾기, 비밀번호 수정
] as const;
