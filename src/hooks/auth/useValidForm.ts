/**
 * hooks/auth/useValidForm.ts
 * 회원가입 폼의 유효성 검사를 진행하는 커스텀 훅
 * - 각 폼의 유효성 검사 함수 반환
 */
export const useValidForm = () => {
  const validId = (data: string): string | null => {
    const regex = /^[a-zA-Z0-9-_]{4,16}$/;
    if (data === "") {
      return "아이디를 입력해주세요.";
    }
    if (!regex.test(data)) {
      return "4~16자의 영문, 숫자, -, _ 만 사용 가능합니다.";
    }

    return null;
  };
  const validPassword = (data: string): string | null => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+~`|}{[\]:;'<>,.?/\\=-]{8,16}$/;
    if (data.length < 8 || data.length > 16) {
      return "비밀번호는 8~16자만 사용 가능합니다.";
    }
    if (!regex.test(data)) {
      return "비밀번호는 8~16자의 영문, 숫자, 특수문자를 조합하여 사용 가능합니다.";
    }
    return null;
  };
  const validEmail = (data: string): string | null => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;

    if (!emailRegex.test(data)) {
      return "이메일을 올바르게 입력해주세요.";
    }
    return null;
  };

  return { validId, validPassword, validEmail };
};
