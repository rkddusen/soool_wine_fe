import { useEffect, useRef, useState } from "react";
import "../../styles/mapOverlayStyle.css";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Place {
  x: number;
  y: number;
  address_name: string;
  phone: string;
  place_name: string;
  place_url: string;
  category_name: string;
}

const Map = () => {
  const [isListOpen, setIsListOpen] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [marker, setMarker] = useState<any[]>([]);
  const [place, setPlace] = useState<Place[]>([]);
  const [isMoved, setIsMoved] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(true);
  const [overView, setOverView] = useState<any[]>([]);
  const [clickView, setClickView] = useState<any[]>([]);
  const [isClickedIndex, setIsClickedIndex] = useState<number>(-1);
  const isClickedIndexRef = useRef<number>(isClickedIndex);
  const clickedMarkerRef = useRef<any>(null);
  const clickedViewRef = useRef<any>(null);

  const setBasicLocation = (): void => {
    const position = {
      coords: {
        latitude: 37.5665,
        longitude: 126.978,
      },
    };
    const { latitude, longitude } = position.coords;
    setPosition({ lat: latitude, lng: longitude });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition({ lat: latitude, lng: longitude });
        },
        () => {
          setBasicLocation();
        }
      );
    } else {
      setBasicLocation();
    }
  }, []);

  useEffect(() => {
    const { kakao } = window;
    if (!map && mapContainer.current && kakao && position) {
      const options = {
        center: new kakao.maps.LatLng(position.lat, position.lng),
        level: 3,
      };

      const mapInstance = new kakao.maps.Map(mapContainer.current, options);

      setMap(mapInstance);
    }
  }, [position]);

  useEffect(() => {
    if (map && isSearch) {
      const { kakao } = window;

      kakao.maps.event.addListener(map, "dragend", () => {
        setIsMoved(true);
      });
      setIsMoved(false);

      const ps = new kakao.maps.services.Places();
      const searchOption = {
        location: map.getCenter(),
        size: 10,
        sort: kakao.maps.services.SortBy.DISTANCE,
      };

      const placesSearchCB = (data: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();

          marker.forEach((m) => m.setMap(null));
          setMarker([]);
          overView.forEach((o) => o.setMap(null));
          setOverView([]);
          clickedViewRef.current?.setMap(null);
          setIsClickedIndex(-1);
          setClickView([]);

          const transformedData = data.map((item: any) => ({
            x: item.x,
            y: item.y,
            address_name: item.address_name,
            phone: item.phone,
            place_name: item.place_name,
            place_url: item.place_url,
            category_name:
              item.category_name.split(" > ")[
                item.category_name.split(" > ").length - 1
              ],
          }));
          for (let i = 0; i < transformedData.length; i++) {
            displayMarker(transformedData[i], i);
            bounds.extend(
              new kakao.maps.LatLng(transformedData[i].y, transformedData[i].x)
            );
          }

          setPlace(transformedData);
          map.setBounds(bounds);
        }
      };

      const displayMarker = (place: any, index: number) => {
        const imageSrc = "/src/assets/wineMarker.png",
          imageSize = new kakao.maps.Size(30, 30);
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        const markerInstance = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(place.y, place.x),
          image: markerImage,
        });
        markerInstance.setMap(map);
        setMarker((prev) => [...prev, markerInstance]);

        const overContent = `
          <div style="background-color: white; padding: 5px 10px; border-radius: 5px; border: 1px solid #e0e0e0; font-size: 12px;  box-shadow: 0px 2px 5px rgba(0,0,0,0.15)">${place.place_name}</div>
        `;
        const _overView = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(place.y, place.x),
          content: overContent,
          xAnchor: 0.5,
          yAnchor: 2.5,
          zIndex: 2,
        });

        const clickContent = document.createElement("div");
        clickContent.classList.add("place-box");
        const clickContentTitle = document.createElement("div");
        clickContentTitle.classList.add("place-title");
        const clickContentTitleP = `
          <div>
            <p class="place-category">${place.category_name}</p>
            <a href=${place.place_url} target='_blank'><span class="place-name">${place.place_name}</span></a>
          </div>
        `;
        const SVG_NS = "http://www.w3.org/2000/svg";
        const clickContentTitleSvg = document.createElementNS(SVG_NS, "svg");
        clickContentTitleSvg.classList.add("place-close");
        clickContentTitleSvg.setAttribute("xmlns", SVG_NS);
        clickContentTitleSvg.setAttribute("viewBox", "0 0 24 24");
        const clickContentTitleSvgLine =
          '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
        clickContentTitleSvg.innerHTML = clickContentTitleSvgLine;

        clickContentTitleSvg.addEventListener("click", function () {
          erasePrevClickView();
        });

        clickContentTitle.innerHTML = clickContentTitleP;
        clickContentTitle.appendChild(clickContentTitleSvg);

        clickContent.appendChild(clickContentTitle);

        const clickContentAddress = document.createElement("div");
        clickContentAddress.classList.add("place-address");
        clickContentAddress.textContent = place.address_name;
        const clickContentPhone = document.createElement("div");
        clickContentPhone.classList.add("place-phone");
        clickContentPhone.textContent = place.phone;
        clickContent.appendChild(clickContentAddress);
        clickContent.appendChild(clickContentPhone);
        const _clickView = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(place.y, place.x),
          content: clickContent,
          xAnchor: 0.5,
          yAnchor: 1.3,
          zIndex: 3,
        });
        kakao.maps.event.addListener(
          markerInstance,
          "mouseover",
          makeOverListener(map, _overView, markerInstance, index)
        );
        kakao.maps.event.addListener(
          markerInstance,
          "mouseout",
          makeOutListener(_overView, markerInstance, index)
        );
        kakao.maps.event.addListener(
          markerInstance,
          "click",
          makeClickListener(
            map,
            _overView,
            _clickView,
            markerInstance,
            index,
            place.x,
            place.y
          )
        );
        setOverView((prev) => [...prev, _overView]);
        setClickView((prev) => [...prev, _clickView]);
      };

      ps.keywordSearch("와인", placesSearchCB, searchOption);
      setIsSearch(false);
    }
  }, [map, isSearch]);

  useEffect(() => {
    isClickedIndexRef.current = isClickedIndex;
  }, [isClickedIndex]);

  const changeCenter = (x: number, y: number): void => {
    const { kakao } = window;

    const moveLatLng = new kakao.maps.LatLng(y, x);
    map.panTo(moveLatLng);
  };
  const setMarkerImage = (type: number): any => {
    const { kakao } = window;
    let imageSrc;
    const imageSize = new kakao.maps.Size(30, 30);
    if (type === 1) {
      imageSrc = "/src/assets/wineMarkerOver.png";
    } else {
      imageSrc = "/src/assets/wineMarker.png";
    }
    return new kakao.maps.MarkerImage(imageSrc, imageSize);
  };

  const erasePrevClickView = () => {
    if (clickedMarkerRef.current && clickedViewRef.current) {
      clickedMarkerRef.current.setZIndex(0);
      const prevMarkerImage = setMarkerImage(0);
      clickedMarkerRef.current.setImage(prevMarkerImage);
      clickedViewRef.current.setMap(null);
    }
  };

  const makeOverListener = (
    map: any,
    _overView: any,
    markerInstance: any,
    index: number
  ) => {
    return function () {
      if (isClickedIndexRef.current !== index) {
        markerInstance.setZIndex(1);
        const markerImage = setMarkerImage(1);
        markerInstance.setImage(markerImage);

        _overView.setMap(map);
      }
    };
  };
  const makeOutListener = (
    _overView: any,
    markerInstance: any,
    index: number
  ) => {
    return function () {
      if (isClickedIndexRef.current !== index) {
        markerInstance.setZIndex(0);
        const markerImage = setMarkerImage(0);
        markerInstance.setImage(markerImage);

        _overView.setMap(null);
      }
    };
  };
  const makeClickListener = (
    map: any,
    _overView: any,
    _clickView: any,
    markerInstance: any,
    index: number,
    x: number,
    y: number
  ) => {
    return function () {
      erasePrevClickView();

      _overView.setMap(null);
      markerInstance.setZIndex(3);
      const markerImage = setMarkerImage(1);
      markerInstance.setImage(markerImage);
      _clickView.setMap(map);

      changeCenter(x, y);

      setIsClickedIndex(index);
      clickedMarkerRef.current = markerInstance;
      clickedViewRef.current = _clickView;
    };
  };

  const handleOverMarker = (i: number): void => {
    if (isClickedIndexRef.current !== i) {
      overView[i].setMap(map);
      marker[i].setZIndex(1);
      const markerImage = setMarkerImage(1);
      marker[i].setImage(markerImage);
    }
  };
  const handleOutMarker = (i: number): void => {
    if (isClickedIndexRef.current !== i) {
      overView[i].setMap(null);
      marker[i].setZIndex(0);
      const markerImage = setMarkerImage(0);
      marker[i].setImage(markerImage);
    }
  };
  const handleClickMarker = (i: number, x: number, y: number): void => {
    erasePrevClickView();

    overView[i].setMap(null);
    marker[i].setZIndex(3);
    const markerImage = setMarkerImage(1);
    marker[i].setImage(markerImage);
    clickView[i].setMap(map);

    changeCenter(x, y);

    setIsClickedIndex(i);
    clickedMarkerRef.current = marker[i];
    clickedViewRef.current = clickView[i];

    setIsListOpen(false);
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full"></div>
      <div
        className={`${
          isListOpen ? "h-[calc(100%-20px)]" : "h-50"
        } w-[calc(100%-20px)] sm:w-350 md:w-400 z-9 absolute bottom-10 left-10 bg-white rounded-15 shadow-wine-box overflow-hidden flex flex-col`}
      >
        <div
          onClick={() => setIsListOpen((prev) => !prev)}
          className="flex items-center justify-center w-full bg-white border-b shrink-0 h-50 border-b-f0-gray sm:border-l sm:border-l-f0-gray hover:bg-f5-gray hover:cursor-pointer"
        >
          <div>
            <p>와인 판매 장소</p>
          </div>
          <svg
            className="ml-5"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#000000 "
            stroke="#000000"
          >
            <polygon
              points={
                isListOpen ? "5 3 14 17 23 3 5 3" : "5 17 14 3 23 17 14 17"
              }
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></polygon>
          </svg>
        </div>
        <div
          className={`${
            isListOpen ? "flex" : "hidden"
          } flex-col w-full h-full overflow-y-scroll`}
        >
          {place.map((v, i) => (
            <div
              key={i}
              onClick={() => handleClickMarker(i, v.x, v.y)}
              onMouseEnter={() => handleOverMarker(i)}
              onMouseLeave={() => handleOutMarker(i)}
              className={`w-full px-20 py-20 border-b ${
                isClickedIndex === i ? "bg-lighter-main" : "hover:bg-f5-gray"
              } hover:cursor-pointer shrink-0 border-b-f5-gray`}
            >
              <p className="mb-5 text-14 text-78-gray line-clamp-1">
                {v.category_name}
              </p>
              <a className="block" href={v.place_url} target="_blank">
                <span className="text-18 hover:underline line-clamp-2">
                  {v.place_name}
                </span>
              </a>
              <p className="mt-5 line-clamp-2">{v.address_name}</p>
              <p className="mt-10 text-14 text-78-gray line-clamp-1">
                {v.phone}
              </p>
            </div>
          ))}
        </div>
      </div>
      {isMoved && (
        <div
          onClick={() => setIsSearch(true)}
          className="absolute flex justify-center w-full top-20 z-1"
        >
          <div className="flex flex-row items-center justify-center max-w-full gap-5 px-20 py-12 rounded-full bg-main hover:bg-dark-main hover:cursor-pointer">
            <svg
              className="w-12 h-12 shrink-0 sm:w-14 sm:h-14"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
            >
              <path
                d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-white shrink-0 sm:text-14 text-12">
              지금 위치에서 검색
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
