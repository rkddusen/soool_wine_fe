// Relation/RelationItemSkeleton.tsx
// RelationItem의 스켈레톤 UI

const RelationItemSkeleton = () => {
  return (
    <div className="w-full h-full p-15 rounded-10 bg-white">
      <div className="w-full pb-[100%] skeletonUI"></div>
      <div className="mt-5 h-12 w-80 skeletonUI"></div>
      <div className="mt-5 w-full h-36 skeletonUI"></div>
      <div className="mt-5 w-full h-16 skeletonUI"></div>
    </div>
  );
};

export default RelationItemSkeleton;
