// WineMap.tsx
// 내 현재 위치를 기준으로 주변에 10개의 와인 판매 지점을 마커로 표시
// 목록과 지도를 함께 표시하고, 각 목록을 클릭하면 카카오맵으로 이동
// 지도를 옮기면 옮겨진 중심을 기준으로 10개씩 불러올 수 있음
import { useCallback, useState } from "react";
import "@/styles/mapOverlayStyle.css";
import { useKakaoMap } from "./hooks/useKakaoMap";
import { useCurrentPosition } from "./hooks/useCurrentPosition";
import { usePlaceSearch } from "./hooks/usePlaceSearch";
import { useMapMarkers } from "./hooks/useMapMarkers";
import { Place } from "@/models/Map";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

declare global {
  interface Window {
    kakao: any;
  }
}
const WineMap = () => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [isSearch, setIsSearch] = useState<boolean>(true);
  const [places, setPlaces] = useState<Place[]>([]);
  const { position } = useCurrentPosition();
  const { map, mapContainer, isMapMoved, resetMapMoved } =
    useKakaoMap(position);

  // 검색을 끝났을 때
  // 검색한 장소를 저장하고, 맵 이동 여부 초기화
  const onSearchComplete = useCallback(
    (searchedPlaces: Place[]) => {
      setPlaces(searchedPlaces);
      setIsSearch(false);
      resetMapMoved();
    },
    [resetMapMoved]
  );
  usePlaceSearch(map, isSearch, onSearchComplete);

  const { clickedIndex, handleMarkerOver, handleMarkerOut, handleMarkerClick } =
    useMapMarkers(map, places);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full"></div>
      <div
        className={`${
          isListOpen ? "h-[calc(100%-20px)]" : "h-50"
        } w-[calc(100%-20px)] sm:w-350 md:w-400 z-9 absolute top-10 left-10 bg-white rounded-15 overflow-hidden flex flex-col shadow-(--wine-box)`}
      >
        <div
          onClick={() => setIsListOpen((prev) => !prev)}
          className="flex items-center justify-center gap-5 w-full bg-(--light-main) shrink-0 h-50  hover:cursor-pointer"
        >
          <div>
            <p>와인 판매 장소</p>
          </div>
          {isListOpen ? (
            <ChevronUpIcon className="w-18 h-18" />
          ) : (
            <ChevronDownIcon className="w-18 h-18" />
          )}
        </div>
        <div
          className={`${
            isListOpen ? "flex" : "hidden"
          } flex-col w-full h-full overflow-y-scroll`}
        >
          {places.map((v, i) => (
            <div
              key={i}
              onClick={() => handleMarkerClick(i, v.x, v.y)}
              onMouseEnter={() => handleMarkerOver(i)}
              onMouseLeave={() => handleMarkerOut(i)}
              className={`w-full px-20 py-20 border-b ${
                clickedIndex === i
                  ? "bg-(--lighter-main)"
                  : "hover:bg-(--gray-f5)"
              } hover:cursor-pointer shrink-0 border-b-(--gray-f5)`}
            >
              <p className="mb-5 text-14 text-(--gray-78) line-clamp-1">
                {v.category_name}
              </p>
              <a className="block" href={v.place_url} target="_blank">
                <span className="text-18 hover:underline line-clamp-2 text-(--main) font-medium">
                  {v.place_name}
                </span>
              </a>
              <p className="mt-5 line-clamp-2">{v.address_name}</p>
              <p className="mt-10 text-14 text-(--gray-78) line-clamp-1">
                {v.phone}
              </p>
            </div>
          ))}
        </div>
      </div>
      {isMapMoved && (
        <div
          onClick={() => setIsSearch(true)}
          className="absolute flex justify-center w-full bottom-20 z-1"
        >
          <div className="flex flex-row items-center justify-center max-w-full gap-5 px-20 py-12 rounded-full bg-(--main) hover:bg-(--dark-main) hover:cursor-pointer">
            <ArrowPathIcon className="w-16 h-16 stroke-white" />
            <span className="text-white shrink-0 sm:text-14 text-12">
              지금 위치에서 검색
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WineMap;
