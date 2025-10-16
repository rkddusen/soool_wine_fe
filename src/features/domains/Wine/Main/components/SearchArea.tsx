// SearchArea.tsx
// 검색창을 포함하여 화면 정보를 보여주는 컴포넌트
import { SearchBar } from "@/components";

const SearchArea = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full px-20 mx-auto md:px-40 max-w-1280">
      <div className="text-center text-(--main) sm:pt-70 sm:pb-50 pt-50 pb-20 select-none">
        <p className="font-sans md:text-54 sm:text-40 text-32">
          What a Wonderful
        </p>
        <p className="font-serif md:text-128 sm:text-96 text-84">Wine</p>
      </div>
      <div className="flex flex-row items-center w-full h-55 max-w-500">
        <div className="w-full h-full rounded-full border border-(--main) overflow-hidden">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default SearchArea;
