// TodayWine/index.tsx
// 서버에서 각 와인 타입(레드, 화이트 등)별로 1개씩 와인 데이터를 받아와 보여주는 컴포넌트
// 성공 시 각 와인 타입에 해당하는 와인은 <WineBox>로 렌더링
import { TYPE_ARRAY } from "@/constants/Wine";
import WinePreview from "./WinePreview";
import WinePreviewSkeleton from "./WinePreviewSkeleton";
import { useTodayWines } from "../../hooks/useTodayWines";

const TodayWine = () => {
  const { data: wine, isLoading } = useTodayWines();
  return (
    <section className="w-full px-20 mx-auto mt-70 md:px-40 max-w-1280">
      <p className="text-20 md:text-24">오늘의 와인</p>
      {/* 각 와인 타입 별 와인 박스 영역 */}
      <div className="flex flex-col gap-20 mt-20 md:grid md:grid-cols-2">
        {TYPE_ARRAY.map(
          (v) =>
            v.type !== "etc" &&
            (isLoading ? (
              <WinePreviewSkeleton key={v.type} type={v.type} />
            ) : (
              <WinePreview key={v.type} type={v.type} wine={wine?.[v.type]} />
            ))
        )}
      </div>
    </section>
  );
};

export default TodayWine;
