/**
 * Map/hooks/useMapMarkers.ts
 */
import { useEffect, useRef, useState } from "react";
import { Place } from "@/models/Map";
import { useMarkerImage } from "./useMarkerImage";

export const useMapMarkers = (map: any, places: Place[]) => {
  const [markers, setMarkers] = useState<any[]>([]);
  const [overViews, setOverViews] = useState<any[]>([]);
  const [clickViews, setClickViews] = useState<any[]>([]);
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const clickedIndexRef = useRef<number>(-1);
  const clickedMarkerRef = useRef<any>(null);
  const clickedViewRef = useRef<any>(null);
  const { setMarkerImage } = useMarkerImage();

  useEffect(() => {
    clickedIndexRef.current = clickedIndex;
  }, [clickedIndex]);

  const onDisplay = (place: any, index: number) => {
    const { kakao } = window;
    const imageSrc = "/src/assets/wineMarker.png",
      imageSize = new kakao.maps.Size(30, 30);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    const markerInstance = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(place.y, place.x),
      image: markerImage,
    });
    markerInstance.setMap(map);
    setMarkers((prev) => [...prev, markerInstance]);

    const overContent = `<div style="background-color: white; padding: 5px 10px; border-radius: 5px; border: 1px solid #e0e0e0; font-size: 12px;  box-shadow: 0px 2px 5px rgba(0,0,0,0.15)">${place.place_name}</div>`;
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
    setOverViews((prev) => [...prev, _overView]);
    setClickViews((prev) => [...prev, _clickView]);
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
      if (clickedIndexRef.current !== index) {
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
      if (clickedIndexRef.current !== index) {
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

      setClickedIndex(index);
      clickedMarkerRef.current = markerInstance;
      clickedViewRef.current = _clickView;
    };
  };

  const displayMarkers = () => {
    const { kakao } = window;
    const bounds = new kakao.maps.LatLngBounds();
    markers.forEach((m) => m.setMap(null));
    setMarkers([]);
    overViews.forEach((o) => o.setMap(null));
    setOverViews([]);
    clickedViewRef.current?.setMap(null);
    setClickedIndex(-1);
    setClickViews([]);

    for (let i = 0; i < places.length; i++) {
      onDisplay(places[i], i);
      bounds.extend(new kakao.maps.LatLng(places[i].y, places[i].x));
    }
    map.setBounds(bounds);
  };

  useEffect(() => {
    if (!map || places.length === 0) return;
    displayMarkers();
  }, [map, places]);

  // 중심 이동
  const changeCenter = (x: number, y: number): void => {
    if (!map) return;
    const { kakao } = window;
    const moveLatLng = new kakao.maps.LatLng(y, x);
    map.panTo(moveLatLng);
  };

  const handleMarkerOver = (i: number): void => {
    if (clickedIndexRef.current !== i) {
      overViews[i].setMap(map);
      markers[i].setZIndex(1);
      const markerImage = setMarkerImage(1);
      markers[i].setImage(markerImage);
    }
  };
  const handleMarkerOut = (i: number): void => {
    if (clickedIndexRef.current !== i) {
      overViews[i].setMap(null);
      markers[i].setZIndex(0);
      const markerImage = setMarkerImage(0);
      markers[i].setImage(markerImage);
    }
  };
  const handleMarkerClick = (i: number, x: number, y: number): void => {
    erasePrevClickView();

    overViews[i].setMap(null);
    markers[i].setZIndex(3);
    const markerImage = setMarkerImage(1);
    markers[i].setImage(markerImage);
    clickViews[i].setMap(map);

    changeCenter(x, y);

    setClickedIndex(i);
    clickedMarkerRef.current = markers[i];
    clickedViewRef.current = clickViews[i];
  };

  return {
    clickedIndex,
    displayMarkers,
    handleMarkerOver,
    handleMarkerOut,
    handleMarkerClick,
    erasePrevClickView,
  };
};
