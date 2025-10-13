// Detail/index.tsx
// 와인 상세 페이지
import { useParams } from "react-router-dom";
import {
  Info,
  Memo,
  Structure,
  Relation,
  InfoSkeleton,
  MemoSkeleton,
  StructureSkeleton,
  RelationSkeleton,
} from "./components";
import { useWine } from "./hooks/useWine";

const Detail = () => {
  const { id } = useParams();
  const wineId = Number(id);

  // 와인 정보 get
  const { data: wine, isError: isWineError, isLoading } = useWine(wineId);

  // 로딩 중 스켈레톤
  if (isLoading) {
    return (
      <>
        <InfoSkeleton />
        <MemoSkeleton />
        <StructureSkeleton />
        <RelationSkeleton />
      </>
    );
  }
  // api 오류 혹은 데이터 없음
  if (isWineError || !wine) return <div>데이터 요청에 실패했습니다.</div>;

  // 정상 작동
  return (
    <>
      <Info wineInfo={wine} />
      <Memo wineId={wine.id} />
      <Structure structure={wine.structure} />
      <Relation wineId={wine.id} type={wine.type} country={wine.country} />
    </>
  );
};

export default Detail;
