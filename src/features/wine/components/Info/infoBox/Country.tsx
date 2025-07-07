// Info/infoBox/Country.tsx
// 와인 생산 국가
import { COUNTRY_LOOKUP } from "@/constants/Country";

interface Props {
  country: string;
}
const Country = ({ country }: Props) => {
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

export default Country;
