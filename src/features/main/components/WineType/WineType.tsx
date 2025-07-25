// WineType/WineType.tsx
// 와인 종류별 필터 버튼 목록을 표시하는 컴포넌트
// 각 버튼은 클릭 시 해당 와인 타입에 맞는 검색 결과 페이지(/storage?type=...)로 이동
import { Link } from "react-router-dom";
import { TYPE_ARRAY } from "@/constants/Wine";
import TypeBtn from "./TypeBtn";

const WineType = () => {
  return (
    <section className="flex flex-row items-start justify-center w-full px-20 mx-auto mt-30 md:px-40 max-w-1280">
      {TYPE_ARRAY.map(
        (v) =>
          v.type !== "etc" && (
            <div
              key={v.type}
              className="w-full overflow-hidden text-center px-15 sm:px-20 sm:max-w-150 max-w-100"
            >
              <div className="mx-auto cursor-pointer group">
                <Link to={`/storage?type=${v.type}`}>
                  <TypeBtn name={v.name} type={v.type} />
                </Link>
              </div>
            </div>
          )
      )}
    </section>
  );
};

export default WineType;
