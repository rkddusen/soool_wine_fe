import { WINETYPE_LOOKUP } from "@/data/Wine";
import { COUNTRY_LOOKUP } from "@/data/Country";
import { WineTypeKey } from "@/models/Wine";
import { useEffect, useRef, useState } from "react";
import { postWineWishlist } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { debounce } from "lodash";
import toast from "react-hot-toast";
import {
  HeartIcon as HeartIconEmpty,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFill } from "@heroicons/react/24/solid";

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
  wishlist: boolean;
  refetchWineWishlist: () => void;
  isWishlistError: boolean;
}
export const WineInteractionBox = ({
  wineId,
  wishlist,
  refetchWineWishlist,
  isWishlistError,
}: WineWishlistBoxProps) => {
  return (
    <div className="flex gap-20 h-60">
      <WineWishlistBox
        wineId={wineId}
        wishlist={wishlist}
        refetchWineWishlist={refetchWineWishlist}
        isWishlistError={isWishlistError}
      />
      <WineShareBox />
    </div>
  );
};
const WineWishlistBox = ({
  wineId,
  wishlist: initialWishlist,
  refetchWineWishlist,
  isWishlistError,
}: WineWishlistBoxProps) => {
  const [wishlist, setWishlist] = useState<boolean>(initialWishlist);
  const callPostWineWishlist = async (): Promise<void> => {
    await postWineWishlist(wineId);
  };

  // 위시리스트 post
  const mutation = useMutation<void, Error, boolean>({
    mutationFn: callPostWineWishlist,
    onError: async (error: Error) => {
      // 위시리스트 post 오류 시 위시리스트 refetch
      console.log("Error postWishlist: ", error);
      toast.error("서버와 문제가 생겼어요. 잠시 후 다시 시도해주세요.");

      refetchWineWishlist();
    },
  });
  useEffect(() => {
    if (mutation.isError && isWishlistError) {
      setWishlist(initialWishlist); // 이전 값으로 복구
    }
  }, [mutation.isError, isWishlistError]);

  const debounceMutateRef = useRef(
    debounce((nextState: boolean) => {
      mutation.mutate(nextState);
    }, 500)
  );

  const handleClickWishlist = () => {
    const nextState = !wishlist;
    setWishlist(nextState);
    debounceMutateRef.current(nextState);
  };

  return (
    <button
      className={`flex items-center justify-center w-full gap-10 px-10 rounded-15 hover:cursor-pointer ${
        wishlist ? "bg-(--light-main) text-black" : "bg-white"
      }`}
      onClick={handleClickWishlist}
    >
      {wishlist ? (
        <HeartIconFill className="w-20 h-20 shrink-0 stroke-(--heart-fill) fill-(--heart-fill)" />
      ) : (
        <HeartIconEmpty className="w-20 h-20 shrink-0" />
      )}
      <p>위시리스트</p>
    </button>
  );
};
const WineShareBox = () => {
  return (
    <button
      className={`flex items-center justify-center w-full gap-10 px-10 rounded-15 hover:cursor-pointer bg-white`}
    >
      <ShareIcon className="w-20 h-20 shrink-0" />
      <p>공유</p>
    </button>
  );
};
