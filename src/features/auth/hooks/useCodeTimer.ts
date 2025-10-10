/**
 * features/Auth/hooks/useCodeTimer.ts
 * 인증 코드 입력의 타이머를 설정하는 커스텀 훅
 * 180초(3분)으로 설정
 * - 남은 시간(초)와 reset 함수 반환
 */
import { useCallback, useEffect, useRef, useState } from "react";

export const useCodeTimer = (nowStart: boolean) => {
  const [seconds, setSeconds] = useState(180);
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const start = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    const newIntervalId = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(newIntervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    intervalIdRef.current = newIntervalId;
  }, []);

  const reset = () => {
    setSeconds(180);
    start();
  };

  useEffect(() => {
    // 렌더링 되자마자 바로 시작할지 확인
    if (nowStart) start();
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  return { seconds, reset };
};
