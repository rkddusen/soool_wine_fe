import Header from "../components/common/Header";
import Map from "../components/place/Map";

const PlacePage = () => {
  return (
    <div className="relative w-full h-dvh">
      <Header />
      <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full pt-80">
        <div className="w-full h-full bg-f0-gray ">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
