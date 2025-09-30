// MemoSkeleton.tsx
// Memo의 스켈레톤 UI

const MemoSkeleton = () => {
  return (
    <div className="px-20 mx-auto mt-20 md:px-40 md:max-w-1000 max-w-500">
      <div className="w-full h-50 rounded-15 overflow-hidden">
        <div className="w-full h-full skeletonUI"></div>
      </div>
    </div>
  );
};

export default MemoSkeleton;
