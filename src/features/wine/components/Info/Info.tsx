// Info/Info.tsx
// 와인 정보를 나타내는 컴포넌트
import { WineWithWinery } from "@/models/Wine";
import { Image, Type, Country, City, Name, Wishlist, Share } from "./infoBox";

interface Props {
  wineInfo: WineWithWinery;
  wishlist: boolean;
  refetchWineWishlist: () => void;
  isWishlistError: boolean;
}

const Info = ({
  wineInfo,
  wishlist,
  refetchWineWishlist,
  isWishlistError,
}: Props) => {
  return (
    <div className="flex flex-col justify-center gap-20 px-20 mx-auto mt-20 md:flex-row md:px-40 md:max-w-1000 max-w-500">
      <Image image={wineInfo.image} ename={wineInfo.ename} />
      <div className="flex flex-col w-full gap-20">
        <Type type={wineInfo.type} />
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
          <Wishlist
            wineId={wineInfo.id}
            wishlist={wishlist}
            refetchWineWishlist={refetchWineWishlist}
            isWishlistError={isWishlistError}
          />
          <Share />
        </div>
      </div>
    </div>
  );
};

export default Info;
