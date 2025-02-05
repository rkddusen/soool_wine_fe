import { SignUpError } from "../models/SignUpError";

export const validId = (data: string): SignUpError | null => {
  const regex = /^[a-zA-Z0-9-_]{4,16}$/;
  if (data === "") {
    return { code: "1001", message: "아이디를 입력해주세요." };
  }
  if (!regex.test(data)) {
    return {
      code: "1002",
      message: "4~16자의 영문, 숫자, -, _ 만 사용 가능합니다.",
    };
  }
  // 아이디 중복 체크
  // 예시 중복 아이디
  const ex = ["qqqq", "1234"];
  if (ex.includes(data)) {
    return { code: "1003", message: "이미 등록된 아이디입니다." };
  }

  return null;
};
export const validPassword = (data: string): SignUpError | null => {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+~`|}{[\]:;'<>,.?/\\=-]{8,16}$/;
  if (data.length < 8 || data.length > 16) {
    return { code: "2001", message: "비밀번호는 8~16자만 사용 가능합니다." };
  }
  if (!regex.test(data)) {
    return {
      code: "2002",
      message:
        "비밀번호는 8~16자의 영문, 숫자, 특수문자를 조합하여 사용 가능합니다.",
    };
  }
  return null;
};
export const validEmail = (
  data1: string,
  data2: string
): SignUpError | null => {
  const emailRegex = /^[a-zA-Z0-9+-_.]+$/;
  const addressRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  if (!emailRegex.test(data1)) {
    return { code: "3001", message: "이메일을 올바르게 입력해주세요." };
  }
  if (!addressRegex.test(data2)) {
    return { code: "3002", message: "이메일 주소를 올바르게 입력해주세요." };
  }
  const ex = ["aaa@naver.com", "aaa@gmail.com"];
  if (ex.includes(data1 + "@" + data2)) {
    return { code: "3002", message: "이미 등록된 이메일입니다." };
  }
  return null;
};

// export const validCode = (data: number): SignUpError | null => {
//   console.log(typeof data);
//   if (typeof data !== "number") {
//     return { code: "4003", message: "코드가 잘못됐습니다." };
//   }
//   return null;
// };
