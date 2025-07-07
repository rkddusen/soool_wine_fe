import { ReactNode } from "react";
import { useSpring, a } from "@react-spring/web";

interface SideFlipCardProps {
  flipped: boolean;
  front: ReactNode;
  back: ReactNode;
}

const SideFlipCard = ({ flipped, front, back }: SideFlipCardProps) => {
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? -180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  return (
    <div className="relative w-full h-full">
      <a.div
        className="absolute top-0 left-0 w-full h-full backface-hidden"
        style={{
          opacity,
          transform,
          rotateY: "180deg",
          transformStyle: "preserve-3d",
        }}
      >
        {back}
      </a.div>
      <a.div
        className="absolute top-0 left-0 w-full h-full backface-hidden"
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform,
          transformStyle: "preserve-3d",
        }}
      >
        {front}
      </a.div>
    </div>
  );
};

export default SideFlipCard;
