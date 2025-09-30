// MyWishlist/MyWishlistItemSkeleton.tsx
// MyWishlistItem의 스켈레톤UI

const MyWishlistItemSkeleton = () => {
  return (
    <li>
      <div className="w-full p-20 h-150 md:h-200 border-b border-(--gray-bb) flex justify-between items-center hover:cursor-pointer">
        {/* 와인 정보 */}
        <div className="h-full w-full flex gap-10">
          <div className="h-full aspect-square shrink-0 skeletonUI"></div>
          <div className="w-full">
            <div className="h-24 w-60 skeletonUI"></div>
            <div className="w-full h-[calc(32px*1.2)] md:h-[calc(40px*1.2)] mt-5 skeletonUI"></div>
            <div className="w-full h-[calc(14px*1.2)] md:h-[calc(16px*1.2)] mt-5 skeletonUI"></div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default MyWishlistItemSkeleton;
