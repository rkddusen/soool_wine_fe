// MyMemo/MyMemoItemSkeleton.tsx
// MyMemoItem의 스켈레톤UI

const MyMemoItemSkeleton = () => {
  return (
    <li className="rounded-15 overflow-hidden mb-20">
      {/* 와인 정보 */}
      <div className="h-120 skeletonUI"></div>
      {/* 메모 내용 */}
      <div className="p-20 border rounded-b-15 border-(--gray-e0)">
        <div className="h-32 flex items-center">
          <div className="h-12 w-100 skeletonUI"></div>
        </div>
        <div className="h-20 w-full skeletonUI mt-5"></div>
        <div className="h-20 w-full skeletonUI mt-5"></div>
        <div className="h-20 w-1/2 skeletonUI mt-5"></div>
      </div>
    </li>
  );
};

export default MyMemoItemSkeleton;
