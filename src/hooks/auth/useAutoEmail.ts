/**
 * hooks/auth/useAutoEmail.ts
 * 이메일의 주소 부분을 자동 완성해주는 커스텀 훅
 * - 사용자의 입력에 각 주소를 붙인 배열 반환
 * - 이때, 사용자가 직접 주소의 일부분을 작성하면 해당 주소로 시작하는 문자열들만 반환
 * - ex) "aa@n" -> ["aa@naver.com", "aa@nate.com"]만 반환
 */
import { useEffect, useState } from "react";

const ADDRESS = [
  "naver.com",
  "gmail.com",
  "kakao.com",
  "daum.net",
  "hanmail.net",
  "outlook.com",
  "nate.com",
];

export const useAutoEmail = (value: string) => {
  const [addressList, setAddressList] = useState<string[]>([]);

  useEffect(() => {
    const email = value ?? "";
    const [localPart, domainPart = ""] = email.split("@");

    if (!localPart) {
      setAddressList([]);
      return;
    }

    const filtered = ADDRESS.filter((domain) =>
      domain.startsWith(domainPart)
    ).map((domain) => `${localPart}@${domain}`);

    setAddressList(filtered);
  }, [value]);

  return { addressList };
};
