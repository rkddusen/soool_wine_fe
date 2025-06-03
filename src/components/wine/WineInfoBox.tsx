import { WINETYPE_LOOKUP } from "@/data/Wine";
import { COUNTRY_LOOKUP } from "@/data/Country";
import { WineTypeKey } from "@/models/Wine";
import { useState } from "react";

interface WineImageBoxProps {
  image: string | null;
  ename: string;
}

export const WineImageBox = ({ image, ename }: WineImageBoxProps) => {
  return (
    <div className="flex items-center justify-center w-full bg-white rounded-15">
      <img src={image || ""} alt={ename} />
    </div>
  );
};

interface WineTypeBoxProps {
  type: WineTypeKey;
}
export const WineTypeBox = ({ type }: WineTypeBoxProps) => {
  const nowWineType = WINETYPE_LOOKUP[type] ?? WINETYPE_LOOKUP["etc"];
  return (
    <div
      className={`w-full h-120 rounded-15 flex justify-center items-center text-white ${nowWineType.bg}`}
    >
      <p className="text-center md:text-28 text-24">{nowWineType.label}</p>
    </div>
  );
};

interface WineCountryBoxProps {
  country: string;
}
export const WineCountryBox = ({ country }: WineCountryBoxProps) => {
  const nowCountry = COUNTRY_LOOKUP[country] ?? COUNTRY_LOOKUP["etc"];
  return (
    <div className="flex gap-20 h-80">
      <div className="flex items-center justify-center bg-white w-80 shrink-0 rounded-15">
        <p className="md:text-36 text-32">{nowCountry.emoji}</p>
      </div>
      <div className="flex items-center justify-center w-full bg-white rounded-15">
        <p className="md:text-20 text-18">{nowCountry.kr}</p>
      </div>
    </div>
  );
};

interface WineCityAndWineryBoxProps {
  region: string;
  city: string | null;
  winery: string;
}
export const WineCityAndWineryBox = ({
  region,
  city,
  winery,
}: WineCityAndWineryBoxProps) => {
  const wineryList = [region, city, winery].filter((v) => !!v);
  return (
    <div className="bg-white rounded-15 p-20 leading-[1.5]">
      <p className="font-bold">와이너리</p>
      <p className="flex flex-wrap">
        {wineryList.map((v, i) => (
          <span key={i}>
            {i !== 0 && <span>&nbsp;&gt;&nbsp;</span>}
            {v}
          </span>
        ))}
      </p>
    </div>
  );
};

interface WineNameBoxProps {
  ename: string;
  kname: string;
  abv: number | null;
}
export const WineNameBox = ({ ename, kname, abv }: WineNameBoxProps) => {
  return (
    <div className="bg-white rounded-15 p-20 leading-[1.5]">
      <p className="text-24">{ename}</p>
      <p>{kname}</p>
      <p className="text-(--gray-78) text-14">{abv && "도수: " + abv + "%"}</p>
    </div>
  );
};

interface WineWishlistBoxProps {
  wineId: number;
}
export const WineInteractionBox = ({ wineId }: WineWishlistBoxProps) => {
  return (
    <div className="flex gap-20 h-60">
      <WineWishlistBox wineId={wineId} />
      <WineShareBox />
    </div>
  );
};
const WineWishlistBox = ({ wineId }: WineWishlistBoxProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleClickWishlist = () => {};

  return (
    <div
      className={`flex items-center justify-center w-full gap-10 px-10 rounded-15 hover:cursor-pointer ${
        isWishlisted ? "bg-(--main) text-white" : "bg-white"
      }`}
      onClick={handleClickWishlist}
    >
      <svg
        className={`w-18 h-18 shrink-0 ${
          isWishlisted ? "stroke-white" : "stroke-(--main)"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      <p>위시리스트</p>
    </div>
  );
};
const WineShareBox = () => {
  return (
    <div
      className={`flex items-center justify-center w-full gap-10 px-10 rounded-15 hover:cursor-pointer bg-white`}
    >
      <svg
        className={`w-18 h-18 shrink-0`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
      </svg>
      <p>공유</p>
    </div>
  );
};
