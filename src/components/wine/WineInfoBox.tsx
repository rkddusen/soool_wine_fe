import { WineType, Country } from "@/models/Wine";

interface WineImageProps {
  image: string | null;
  ename: string;
}

export const WineImage = ({ image, ename }: WineImageProps) => {
  return (
    <div className="w-full bg-(--lightest-main) rounded-15">
      <img src={image || ""} alt={ename} />
    </div>
  );
};

interface WineTypeAndCountryProps {
  type: string;
  country: string;
}
export const WineTypeAndCountry = ({
  type,
  country,
}: WineTypeAndCountryProps) => {
  return (
    <div className="flex gap-20 h-60">
      <div
        className={`w-full rounded-15 flex justify-center items-center text-white ${
          WineType.get(type)?.bg
        }`}
      >
        <p className="md:text-16 text-14">{type}</p>
      </div>
      <div className="w-full bg-(--lightest-main) rounded-15 flex gap-5 justify-center items-center">
        <span className="md:text-24 text-18">
          {Country.get(country)?.emoji}
        </span>
        <span className="md:text-16 text-14">
          {Country.get(country)?.ename}
        </span>
      </div>
    </div>
  );
};

interface WineCityAndWineryProps {
  region: string;
  country: string;
  city: string | null;
  winery: string;
}
export const WineCityAndWinery = ({
  region,
  country,
  city,
  winery,
}: WineCityAndWineryProps) => {
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

interface WineNameProps {
  ename: string;
  kname: string;
  abv: number | null;
}
export const WineName = ({ ename, kname, abv }: WineNameProps) => {
  return (
    <div className="bg-(--lightest-main) rounded-15 p-20 leading-[1.5]">
      <p className="text-24">{ename}</p>
      <p>{kname}</p>
      <p className="text-(--gray-78) text-14">{abv && "도수: " + abv + "%"}</p>
    </div>
  );
};
