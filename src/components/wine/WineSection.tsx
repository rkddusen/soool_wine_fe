import { WineWithWinery } from "@/models/Wine";
import {
  WineCityAndWineryBox,
  WineImageBox,
  WineNameBox,
  WineTypeBox,
  WineCountryBox,
  WineInteractionBox,
} from "./WineInfoBox";

interface WineSectionProps {
  wineInfo: WineWithWinery;
  wishlist: boolean;
  refetchWineWishlist: () => void;
}

const WineSection = ({
  wineInfo,
  wishlist,
  refetchWineWishlist,
}: WineSectionProps) => {
  return (
    <div className="flex flex-col justify-center gap-20 px-20 mx-auto mt-20 md:flex-row md:px-40 md:max-w-1000 max-w-500">
      <WineImageBox image={wineInfo.image} ename={wineInfo.ename} />
      <div className="flex flex-col w-full gap-20">
        <WineTypeBox type={wineInfo.type} />
        <WineCountryBox country={wineInfo.country} />
        <WineCityAndWineryBox
          region={wineInfo.region}
          city={wineInfo.city}
          winery={wineInfo.winery}
        />
        <WineNameBox
          ename={wineInfo.ename}
          kname={wineInfo.kname}
          abv={wineInfo.abv}
        />
        <WineInteractionBox
          wineId={wineInfo.id}
          wishlist={wishlist}
          refetchWineWishlist={refetchWineWishlist}
        />
      </div>
    </div>
  );
};

export default WineSection;
