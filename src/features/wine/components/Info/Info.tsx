// Info/Info.tsx
// 와인 정보를 나타내는 컴포넌트
import { Image, Country, City, Name, Wishlist, Share } from "./infoBox";
import { TypeBadge } from "@/components";
import { WineWithWinery } from "@/models/Wine";
import { TYPE_LOOKUP } from "@/constants/Wine";

interface InfoProps {
  wineInfo: WineWithWinery;
}

const Info = ({ wineInfo }: InfoProps) => {
  const nowWineType = TYPE_LOOKUP[wineInfo.type] ?? TYPE_LOOKUP["etc"];
  return (
    <div className="flex flex-col justify-center gap-20 px-20 mx-auto mt-20 md:flex-row md:px-40 md:max-w-1000 max-w-500">
      <Image image={wineInfo.image} ename={wineInfo.ename} />
      <div className="flex flex-col w-full gap-20">
        <TypeBadge
          type={nowWineType.type}
          label={nowWineType.label}
          variant="large"
        />
        <Country country={wineInfo.country} />
        <City
          region={wineInfo.region}
          city={wineInfo.city}
          winery={wineInfo.winery}
        />
        <Name
          ename={wineInfo.ename}
          kname={wineInfo.kname}
          abv={wineInfo.abv}
        />
        <div className="flex gap-20 h-60">
          <Wishlist wineId={wineInfo.id} />
          <Share />
        </div>
      </div>
    </div>
  );
};

export default Info;
