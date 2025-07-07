// MainCity/card/Card.tsx
// 도시 카드
import { SideFlipCard } from "@/components";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import { City } from "@/models/Country";
import { useState } from "react";

interface Props {
  // 도시 객체
  city: City;
}
const Card = ({ city }: Props) => {
  // 카드가 뒤집혀 있는 상태인지 여부
  // true면 뒷면(설명), false면 앞면(도시 정보)
  const [flipped, setFlipped] = useState<boolean>(false);
  return (
    <li
      key={city.city}
      className="overflow-hidden bg-white w-320 shrink-0 h-500 rounded-20"
    >
      <SideFlipCard
        flipped={flipped}
        front={
          // 카드 앞면: 도시 정보
          <div className="flex flex-col justify-between w-full h-full p-20">
            <CardHeader country={city.country} />
            <div>
              <p className="tracking-wider text-center text-24">{city.city}</p>
              <p className="mt-10 text-center">{city.kname}</p>
              <img
                className="object-cover w-full my-20 h-200 rounded-20"
                src={city.img}
                alt={city.city}
              />
            </div>
            <CardFooter onFlip={() => setFlipped((prev) => !prev)} />
          </div>
        }
        back={
          // 카드 뒷면: 도시 설명
          <div className="flex flex-col justify-between w-full h-full p-20">
            <CardHeader country={city.country} />
            <div>
              <p className="leading-32">{city.description}</p>
            </div>
            <CardFooter onFlip={() => setFlipped((prev) => !prev)} />
          </div>
        }
      ></SideFlipCard>
    </li>
  );
};

export default Card;
