// Relation/index.tsx
// 해당 와인과 관련있는 와인을 나타내는 컴포넌트
// 와인 타입과 나라를 기준으로 분리하여 UI 표시
import { TypeKey } from "@/models/Wine";
import { useRelationStandard } from "../../hooks/useRelationStandard";
import RelationList from "./RelationList";
import { useWineRelation } from "../../hooks/useWineRelation";
import RelationSkeleton from "../RelationSkeleton";

interface RelationProps {
  wineId: number;
  type: TypeKey;
  country: string;
}

const Relation = ({ wineId, type, country }: RelationProps) => {
  const { standardType, standardCountry } = useRelationStandard(type, country);
  const { relationByType, relationByCountry, isLoading } = useWineRelation(
    wineId,
    standardType,
    standardCountry
  );

  if (isLoading) {
    return <RelationSkeleton />;
  }

  return (
    <div>
      {/* 현재 와인의 type과 관련된 와인 리스트 */}
      {relationByType && (
        <RelationList
          title="type"
          standard={standardType}
          items={relationByType}
        />
      )}
      {/* 현재 와인의 country와 관련된 와인 리스트 */}
      {relationByCountry && (
        <RelationList
          title="country"
          standard={standardCountry}
          items={relationByCountry}
        />
      )}
    </div>
  );
};

export default Relation;
