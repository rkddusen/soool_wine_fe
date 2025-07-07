// features/map/Map.tsx
// 주변와인 페이지
import { Header } from "@/components";
import WineMap from "./WineMap";

const Map = () => {
  return (
    <div className="relative w-full h-dvh">
      <Header />
      <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full pt-80">
        <div className="w-full h-full bg-f0-gray ">
          <WineMap />
        </div>
      </div>
    </div>
  );
};

export default Map;
