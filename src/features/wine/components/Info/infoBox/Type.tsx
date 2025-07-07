// Info/infoBox/Type.tsx
// 와인 타입
import { TYPE_LOOKUP } from "@/constants/Wine";
import { TypeKey } from "@/models/Wine";

interface Props {
  type: TypeKey;
}
const Type = ({ type }: Props) => {
  const nowWineType = TYPE_LOOKUP[type] ?? TYPE_LOOKUP["etc"];
  return (
    <div
      className={`w-full h-120 rounded-15 flex justify-center items-center text-white`}
      style={{ backgroundColor: `var(--${nowWineType.type}-wine)` }}
    >
      <p className="text-center md:text-28 text-24">{nowWineType.label}</p>
    </div>
  );
};

export default Type;
