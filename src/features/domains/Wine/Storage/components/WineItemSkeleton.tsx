// WineItemSkeleton.tsx
// WineItem의 스켈레톤 UI

const WineItemSkeleton = () => {
  return (
    <div className="max-w-700 w-full lg:w-[calc((100%/2)-20px)] bg-white rounded-15 h-200 hover:cursor-pointer hover:scale-102 duration-300">
      <div className="flex w-full h-full p-20">
        {/* 와인 이미지 영역 */}
        <div className="w-[30%] h-full skeletonUI"></div>
        {/* 와인 정보 영역 */}
        <div className="w-[70%] break-keep shrink-0 px-10 flex flex-col gap-5">
          {/* <TypeBadge variant="small" /> */}
          <div className="h-24 w-60 skeletonUI"></div>
          <div className="h-16 w-100 skeletonUI"></div>
          <div className="h-40 w-full skeletonUI"></div>
          <div className="h-16 w-full skeletonUI"></div>
        </div>
      </div>
    </div>
  );
};

export default WineItemSkeleton;
