// MainCity/Card/CardHeader.tsx
// 도시 카드(Header)
import { COUNTRY_LOOKUP } from "@/constants/Country";

interface CardHeaderProps {
  // 국가 코드
  country: string;
}
const CardHeader = ({ country }: CardHeaderProps) => {
  // COUNTRY_LOOKUP에서 국가 코드에 해당하는 데이터 조회
  // 없으면 'etc'(기타)
  const nowCountry = COUNTRY_LOOKUP[country] ?? COUNTRY_LOOKUP.etc;
  return (
    <div className="flex items-center gap-5">
      <p className="text-32">{nowCountry.emoji}</p>
      <p className="text-16">{nowCountry.en}</p>
    </div>
  );
};

export default CardHeader;
