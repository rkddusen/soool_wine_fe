// RelationSkeleton.tsx
// Relation의 스켈레톤 UI
import RelationItemSkeleton from "./Relation/RelationItemSkeleton";

const RelationSkeleton = () => {
  return (
    <div>
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="pt-40">
          {/* Relation 기준 */}
          <div className="text-20 px-20 mx-auto md:px-40 md:max-w-1000 max-w-500">
            <div className="h-20 w-100 skeletonUI"></div>
            <div className="h-28 w-80 skeletonUI my-10"></div>
            <div className="h-20 w-300 skeletonUI"></div>
          </div>
          {/* 아이템 */}
          <div>
            <ul className="flex gap-20 my-20 w-full overflow-x-scroll scrollbar-hide h-300 md:px-[max(40px,_calc((100vw-940px)/2))] px-[max(20px,_calc((100vw-480px)/2))]">
              {Array.from({ length: 10 }).map((_, i) => (
                <li key={i} className="w-200 shrink-0">
                  <RelationItemSkeleton />
                </li>
              ))}
            </ul>
          </div>
          {/* 버튼 */}
          <div className="flex justify-end mx-auto gap-15 w-full px-20 md:px-40 md:max-w-1000 max-w-500">
            <div className="w-40 h-40 rounded-full overflow-hidden">
              <div className="w-full h-full skeletonUI"></div>
            </div>
            <div className="w-40 h-40 rounded-full overflow-hidden">
              <div className="w-full h-full skeletonUI"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelationSkeleton;
