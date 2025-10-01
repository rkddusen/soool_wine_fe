// TodayWine/WinePreviewSkeleton.tsx
// WinePreview의 스켈레톤 UI
import { TypeBadge } from "@/components";
import { TYPE_LOOKUP } from "@/constants/Wine";
import { TypeKey } from "@/models/Wine";

interface WinePreviewSkeletonProps {
  // 와인 타입 (ex. red)
  type: TypeKey;
}

const WinePreviewSkeleton = ({ type }: WinePreviewSkeletonProps) => {
  return (
    <div className="flex flex-col w-full p-10 overflow-hidden bg-white rounded-15 h-320 group">
      {/* 와인 타입 영역 */}
      <TypeBadge type={type} label={TYPE_LOOKUP[type].label} variant="medium" />
      {/* 와인 정보 영역 */}
      <div className="relative w-full h-full py-10">
        <div className="pr-[calc(30%+10px)] h-full break-keep z-10">
          <div className="h-20 w-100 skeletonUI"></div>
          <div className="mt-5">
            <div className="h-40 w-full skeletonUI"></div>
            <div className="mt-5 h-16 w-full skeletonUI"></div>
          </div>
          {/* 와인 구조 영역 */}
          <div className="flex flex-col gap-10 mt-20">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 flex gap-10">
                <div className="w-27 skeletonUI"></div>
                <div className="w-120 skeletonUI"></div>
              </div>
            ))}
          </div>
        </div>
        {/* 와인 이미지 영역 */}
        <div className="absolute w-[30%] right-0 h-[calc(100%+50px)] bottom-0 skeletonUI"></div>
      </div>
    </div>
  );
};

export default WinePreviewSkeleton;
