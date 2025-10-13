// InfoSkeleton.tsx
// Info의 스켈레톤 UI

const InfoSkeleton = () => {
  return (
    <div className="flex flex-col justify-center gap-20 px-20 mx-auto mt-20 md:flex-row md:px-40 md:max-w-1000 max-w-500">
      {/* 이미지 */}
      <div className="w-full rounded-15 overflow-hidden pb-[100%] md:pb-0 relative">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-full h-full skeletonUI"></div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-20">
        {/* 타입 뱃지 */}
        <div className="w-full h-120 rounded-15 overflow-hidden">
          <div className="w-full h-full skeletonUI"></div>
        </div>
        {/* 생산 국가 */}
        <div className="flex gap-20 h-80">
          <div className="w-80 shrink-0 rounded-15 overflow-hidden">
            <div className="w-full h-full skeletonUI"></div>
          </div>
          <div className="w-full rounded-15 overflow-hidden">
            <div className="w-full h-full skeletonUI"></div>
          </div>
        </div>
        {/* 와이너리 */}
        <div className="rounded-15 h-88 overflow-hidden">
          <div className="w-full h-full skeletonUI"></div>
        </div>
        {/* 와인명 */}
        <div className="rounded-15 h-146 overflow-hidden">
          <div className="w-full h-full skeletonUI"></div>
        </div>
        <div className="flex gap-20 h-60">
          {/* 위시리스트 버튼 */}
          <div className="w-full rounded-15 overflow-hidden">
            <div className="w-full h-full skeletonUI"></div>
          </div>
          {/* 공유 버튼 */}
          <div className="w-full rounded-15 overflow-hidden">
            <div className="w-full h-full skeletonUI"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSkeleton;
