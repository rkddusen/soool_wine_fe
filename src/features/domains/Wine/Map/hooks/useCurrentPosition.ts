/**
 * Map/hooks/useCurrentPosition.ts
 * 현재 위치를 가져오는 커스텀 훅
 * 현재 위치를 가져오지 못하면 '서울 시청' 위치로 fallback
 * - 위치 반환
 */
import { useEffect, useState } from "react";
import { Position } from "@/models/Map";

export const useCurrentPosition = () => {
  const [position, setPosition] = useState<Position | null>(null);
  // 위치 로딩 예정

  const setBasicLocation = (): void => {
    const defaultPosition = {
      lat: 37.5665,
      lng: 126.978,
    };
    setPosition(defaultPosition);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition({ lat: latitude, lng: longitude });
        },
        () => {
          // toast 메시지 띄우기
          setBasicLocation();
        }
      );
    } else {
      // toast 메시지 띄우기
      setBasicLocation();
    }
  }, []);

  return { position };
};
