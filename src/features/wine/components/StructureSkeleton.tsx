// StructureSkeleton.tsx
// Structure의 스켈레톤 UI

const StructureSkeleton = () => {
  return (
    <div className="px-20 mx-auto mt-20 md:px-40 md:max-w-1000 max-w-500">
      <p className="text-32 md:text-40 text-(--main) text-center font-display pt-40 pb-20">
        와인 구조
      </p>
      <div className="flex flex-col justify-center gap-20 md:flex-row">
        <div className="w-full h-200 rounded-15 overflow-hidden">
          <div className="w-full h-full skeletonUI"></div>
        </div>
        <div className="w-full h-200 rounded-15 overflow-hidden">
          <div className="w-full h-full skeletonUI"></div>
        </div>
      </div>
    </div>
  );
};

export default StructureSkeleton;
