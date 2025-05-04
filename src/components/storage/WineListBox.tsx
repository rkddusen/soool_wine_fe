import { WineWithWinery } from "../../models/Wine";
import { Link } from "react-router-dom";
import { Filter } from "../../models/Filter";
import { COUNTRY } from "@/data/Country";
import { WINETYPE_LOOKUP } from "@/data/Wine";

interface WineListBoxProps {
  wine: WineWithWinery;
  filterInfo: Filter;
}

const WineListBox = ({ wine, filterInfo }: WineListBoxProps) => {
  const countryInfo = COUNTRY.get(wine.country);
  const wineType = WINETYPE_LOOKUP[wine.type] ?? WINETYPE_LOOKUP["etc"];

  return (
    <div className="max-w-700 w-full lg:w-[calc((100%/2)-20px)] bg-white rounded-15 h-200 hover:cursor-pointer hover:scale-102 duration-300">
      <Link to={`/wine/${wine.id}`} state={{ filterInfo: filterInfo }}>
        <div className="flex w-full h-full p-20">
          <div className="w-[30%] h-full">
            <img
              src={wine.image ? wine.image : undefined}
              className={`object-cover h-full`}
            />
          </div>
          <div className="w-[70%] break-keep shrink-0">
            <div>
              <span
                className={`inline-block text-12 text-white py-6 px-8 rounded-5 mb-5 ${wineType.bg}`}
              >
                {wineType.title}
              </span>
            </div>
            <div>
              <span className="text-14">
                {countryInfo ? countryInfo.emoji : null}
              </span>
              <span className="ml-5 text-14">
                {countryInfo?.en}
                {wine.region ? " > " + wine.region : null}
              </span>
            </div>
            <div className="mt-5">
              <p className="truncate-2 text-16 leading-[120%]">{wine.ename}</p>
              <p className="mt-5 truncate-2 text-14 text-(--gray-78) leading-[120%]">
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
