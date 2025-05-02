import { Country } from "@/models/Wine";
import { WINETYPE_MAP } from "@/data/Wine";

interface WineImageBoxProps {
  image: string | null;
  ename: string;
}

export const WineImageBox = ({ image, ename }: WineImageBoxProps) => {
  return (
    <div className="w-full flex justify-center items-center bg-(--lightest-main) rounded-15">
      <img src={image || ""} alt={ename} />
    </div>
  );
};

interface WineTypeBoxProps {
  type: string;
}
export const WineTypeBox = ({ type }: WineTypeBoxProps) => {
  return (
    <div
      className={`w-full h-120 rounded-15 flex justify-center items-center text-white ${
        WINETYPE_MAP.get(type)?.bg
      }`}
    >
      <p className="text-center md:text-28 text-24">
        {WINETYPE_MAP.get(type)?.label}
      </p>
    </div>
  );
};

interface WineCountryBoxProps {
  country: string;
}
export const WineCountryBox = ({ country }: WineCountryBoxProps) => {
  return (
    <div className="flex gap-20 h-80">
      <div className="w-80 md:text-36 text-32  bg-(--lightest-main) flex justify-center items-center rounded-15">
        <p className="">{Country.get(country)?.emoji}</p>
      </div>
      <div className="w-full bg-(--lightest-main) rounded-15 flex justify-center items-center">
        <p className="md:text-20 text-18">{Country.get(country)?.ename}</p>
      </div>
    </div>
  );
};

interface WineCityAndWineryBoxProps {
  region: string;
  country: string;
  city: string | null;
  winery: string;
}
export const WineCityAndWineryBox = ({
  region,
  country,
  city,
  winery,
}: WineCityAndWineryBoxProps) => {
  return (
    <div className="bg-(--lightest-main) rounded-15 p-20 leading-[1.5]">
      <p className="font-bold">와이너리</p>
      <p className="flex flex-wrap">
        <span>{region || Country.get(country)?.ename}</span>
        <span>
          &nbsp;{">"} {city}
        </span>
        <span>
          &nbsp;{">"} {winery}
        </span>
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
    <div className="bg-(--lightest-main) rounded-15 p-20 leading-[1.5]">
      <p className="text-24">{ename}</p>
      <p>{kname}</p>
      <p className="text-(--gray-78) text-14">{abv && "도수: " + abv + "%"}</p>
    </div>
  );
};
