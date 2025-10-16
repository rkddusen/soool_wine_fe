/**
 * Place/hooks/useKakaoMap.ts
 * 지도를 생성하는 커스텀 훅
 * - 지도 반환
 */
import { useEffect, useRef, useState } from "react";
import { Position } from "@/models/Map";

export const useKakaoMap = (position: Position | null) => {
  const [map, setMap] = useState<any>(null);
  // 사용자가 map을 이동시켰는지 여부
  const [isMapMoved, setIsMapMoved] = useState<boolean>(false);
  // map을 보여줄 컨테이너
  const mapContainer = useRef<HTMLDivElement>(null);

  // 위치에 따라서 지도 출력
  useEffect(() => {
    const { kakao } = window;
    if (!map && mapContainer.current && kakao && position) {
      const options = {
        center: new kakao.maps.LatLng(position.lat, position.lng),
        level: 3,
      };

      const mapInstance = new kakao.maps.Map(mapContainer.current, options);
      setMap(mapInstance);

      // 드래그 이벤트 리스너 추가
      kakao.maps.event.addListener(mapInstance, "dragend", () => {
        setIsMapMoved(true);
      });
    }
  }, [position]);

  // 이동 여부 리셋
  // 이동한 자리에서 검색을 수행했을 때 필요
  // (이동한 자리가 현재 자리가 되는 것이기 때문에)
  const resetMapMoved = () => {
    setIsMapMoved(false);
  };

  return {
    map,
    mapContainer,
    isMapMoved,
    resetMapMoved,
  };
};
