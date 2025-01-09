import Header from "../components/common/Header";
import Map from "../components/place/Map";

const PlacePage = () => {
  return (
    <div className="relative w-full h-full leading-1">
      <Header />
      <div className="absolute top-0 left-0 w-full h-full pt-80">
        <div className="w-full h-full bg-f0-gray ">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
