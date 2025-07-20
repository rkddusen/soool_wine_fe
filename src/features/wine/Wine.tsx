// features/wine/Wine.tsx
// 와인 상세 페이지
import { useParams } from "react-router-dom";
import { Info, Memo, Structure } from "./components";
import { useWine } from "./hooks/useWine";
import Relation from "./components/Relation";

const Wine = () => {
  const { id } = useParams();
  const wineId = Number(id);

  // 와인 정보 get
  const { data: wine, isError: isWineError, isLoading } = useWine(wineId);

  if (isLoading) return <div>로딩 중입니다.</div>;
  if (isWineError) return <div>데이터 요청에 실패했습니다.</div>;
  if (!wine) return <div>와인 정보가 없습니다.</div>;
  return (
    <>
      <Info wineInfo={wine} />
      <Memo wineId={wine.id} />
      <Structure structure={wine.structure} />
      <Relation wineId={wine.id} type={wine.type} country={wine.country} />
    </>
  );
};

export default Wine;
