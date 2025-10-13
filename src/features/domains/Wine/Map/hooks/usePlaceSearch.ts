/**
 * Map/hooks/usePlaceSearch.ts
 * 와인 검색어로 검색하는 커스텀훅
 * 검색으로 나온 장소들은 onSearchComplete에서 저장
 * - void
 */
import { Place } from "@/models/Map";
import { useEffect } from "react";

export const usePlaceSearch = (
  map: any,
  isSearch: boolean,
  onSearchComplete: (places: Place[]) => void
) => {
  // 검색 로딩 예정

  useEffect(() => {
    if (map && isSearch) {
      const { kakao } = window;
      const ps = new kakao.maps.services.Places();

      const searchOption = {
        location: map.getCenter(), // 현재 지도 중심 기준으로 검색
        size: 10, // 최대 10개 결과 반환
        sort: kakao.maps.services.SortBy.DISTANCE, // 거리순 정렬
      };

      const placesSearchCB = (data: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const newPlaces = data.map((item: any) => ({
            x: item.x,
            y: item.y,
            address_name: item.address_name,
            phone: item.phone,
            place_name: item.place_name,
            place_url: item.place_url,
            category_name:
              item.category_name.split(" > ")[
                item.category_name.split(" > ").length - 1 // 마지막 카테고리만 추출
              ],
          }));

          // 검색 결과 콜백에 전달
          onSearchComplete(newPlaces);
        }
      };

      // '와인' 키워드로 장소 검색 시작
      ps.keywordSearch("와인", placesSearchCB, searchOption);
    }
  }, [map, isSearch, onSearchComplete]);
};
