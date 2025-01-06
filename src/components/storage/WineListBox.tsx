import { useState } from "react";
import { WineType, Country, WineWithWinery } from "../../models/Wine";
import { Link } from "react-router-dom";
import { Filter } from "../../models/Filter";

interface WineListBoxComponentProps {
  wine: WineWithWinery;
  filterInfo: Filter;
}

const WineListBox = ({ wine, filterInfo }: WineListBoxComponentProps) => {
  const countryInfo = Country.get(wine.country);
  const wineType = WineType.get(wine.type);
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleMouseEnter = (): void => {
    setIsHover(true);
  };
  const handleMouseLeave = (): void => {
    setIsHover(false);
  };

  return (
    <div
      className="max-w-700 w-full lg:w-[calc((100%/2)-20px)] bg-f5-gray rounded-15 h-200 hover:cursor-pointer hover:shadow-wine-box duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/wine/${wine.id}`} state={{ filterInfo: filterInfo }}>
        <div className="flex w-full h-full p-20">
          <div className="w-[30%] h-full flex items-center justify-center overflow-x-hidden">
            <div className="h-[90%]">
              <img
                src={wine.image ? wine.image : undefined}
                className={`object-cover w-full ${
                  isHover ? "h-[105%]" : "h-full"
                } duration-300`}
              />
            </div>
          </div>
          <div className="w-[70%] break-keep shrink-0">
            <div>
              <span
                className={`inline-block text-12 text-white py-6 px-8 rounded-5 mb-5 ${wineType?.bg}`}
              >
                {wineType?.kr}
              </span>
            </div>
            <div>
              <span className="text-14">
                {countryInfo ? countryInfo.emoji : null}
              </span>
              <span className="ml-5 text-14">
                {countryInfo?.ename}
                {wine.region ? " > " + wine.region : null}
              </span>
            </div>
            <div className="mt-5">
              <p className="truncate-2 text-16 leading-[120%]">{wine.ename}</p>
              <p className="mt-5 truncate-2 text-14 text-78-gray leading-[120%]">
                {wine.kname}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default WineListBox;
