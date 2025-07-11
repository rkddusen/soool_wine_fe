/**
 * features/map/hooks/useMarkerImage.ts
 * 타입에 따라서 마커 이미지 변경
 * type이 1이면 마커 호버
 * - 마커 이미지 반환
 */
import { useCallback } from "react";

export const useMarkerImage = () => {
  const setMarkerImage = useCallback((type: number): any => {
    const { kakao } = window;
    let imageSrc = "/src/assets/wineMarker.png";
    const imageSize = new kakao.maps.Size(30, 30);

    if (type === 1) {
      imageSrc = "/src/assets/wineMarkerOver.png";
    }

    return new kakao.maps.MarkerImage(imageSrc, imageSize);
  }, []);

  return { setMarkerImage };
};
